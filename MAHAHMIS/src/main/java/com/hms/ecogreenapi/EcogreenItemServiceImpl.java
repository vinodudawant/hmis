package com.hms.ecogreenapi;

import java.lang.reflect.InvocationTargetException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.apache.commons.beanutils.BeanUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.pharmacy.pojo.CategoryMaster;
import com.hms.pharmacy.pojo.CompanyMaster;
import com.hms.pharmacy.pojo.DrugMaster;
import com.hms.pharmacy.pojo.HsnMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.ShelfMaster;
import com.hms.pharmacy.pojo.StrengthMaster;
import com.hms.pharmacy.pojo.TaxMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Service
@Transactional
public class EcogreenItemServiceImpl implements EcogreenItemService {

	@Autowired
	SessionFactory sf;
	
	@Autowired
	RestTemplate restTemplate;

	@Override
	public int saveEcoreenItemDetails(EcogreenItemMasterDto obj) {
		try {
			sf.getCurrentSession().merge(obj);
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public EcogreenItemMasterDto getItemList(int masterId) {
		EcogreenItemMasterDto obj = new EcogreenItemMasterDto();
		try {
			obj = (EcogreenItemMasterDto) sf.getCurrentSession().get(EcogreenItemMasterDto.class, masterId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@SuppressWarnings("unchecked")
	@Override
	public String saveItemMaterNew() {

		ResourceBundle bundle = ResourceBundle.getBundle("Ehat");
		String ECOGreenAPI = bundle.getObject("ecogreenapi").toString();
		String apiUrl = ECOGreenAPI + "ws_item_mst_genric?date=2023-01-10";
		RestTemplate restTemplate = new RestTemplate();

		String responseEntity = restTemplate.exchange(apiUrl, HttpMethod.POST, null, String.class).getBody();
		ObjectMapper mapper = new ObjectMapper();
		try {
			ItemMstGenericResponse[] objp = mapper.readValue(responseEntity, ItemMstGenericResponse[].class);
			List<ItemMstGenericResponse> asList = Arrays.asList(objp);
			//asList.forEach(eco -> {
			for(int i=0; i< 200; i++) {

				EcoGreenItemMasterNew itemMasterNew = new EcoGreenItemMasterNew();
				try {
					BeanUtils.copyProperties(itemMasterNew, asList.get(i));
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}

				List<EcoGreenItemMasterNew> list = sf.getCurrentSession().createCriteria(EcoGreenItemMasterNew.class)
						.add(Restrictions.eq("deleted", "N"))
						.add(Restrictions.eq("itemCode", itemMasterNew.getItemCode())).list();

				if (list.size() > 0) {

					itemMasterNew.setId(list.get(0).getId());
					sf.getCurrentSession().merge(itemMasterNew);
					
				} else {
					sf.getCurrentSession().merge(itemMasterNew);					
				}
			}
			return "1";
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return "0";
	}

	@SuppressWarnings("unchecked")
	@Override
	public String saveProductMasterNew() {

		try {
			String jpql = "SELECT e FROM EcoGreenItemMasterNew e WHERE e.deleted = :deleted";
			List<EcoGreenItemMasterNew> list = (List<EcoGreenItemMasterNew>) sf.getCurrentSession().createQuery(jpql)
					.setParameter("deleted", "N").list();
			if (list.size() > 0) {

				PackingMaster packingMaster = new PackingMaster();
				packingMaster.setPackDeleteFlag(0);
				packingMaster.setPackType("-");
				PackingMaster packingMasterDB = (PackingMaster) sf.getCurrentSession().merge(packingMaster);

				CompanyMaster companyMaster = new CompanyMaster();
				companyMaster.setCompName("-");
				companyMaster.setCompDeleteFlag(0);
				companyMaster.setCompShortName("-");
				CompanyMaster companyMasterDB = (CompanyMaster) sf.getCurrentSession().merge(companyMaster);

				ShelfMaster shelfMaster = new ShelfMaster();
				shelfMaster.setShelfName("-");
				shelfMaster.setShelfDeleteFlag(0);
				ShelfMaster selfobj = (ShelfMaster) sf.getCurrentSession().merge(shelfMaster);

				CategoryMaster categoryMaster = new CategoryMaster();
				categoryMaster.setCatDeleteFlag(0);
				categoryMaster.setCatName("-");
				CategoryMaster categoryMasterDB = (CategoryMaster) sf.getCurrentSession().merge(categoryMaster);

				HsnMaster hsnMaster = new HsnMaster();
				hsnMaster.setDeleteFlag(0);
				hsnMaster.setHsnNo("0");
				HsnMaster hsnMasterDB = (HsnMaster) sf.getCurrentSession().merge(hsnMaster);

				TaxMaster taxMaster = new TaxMaster();
				taxMaster.setTaxDeleteFlag(0);
				taxMaster.setTaxName("-");
				TaxMaster taxobj = (TaxMaster) sf.getCurrentSession().merge(taxMaster);

				list.forEach(itemMasterNew -> {

					String hql = "FROM ProductMaster p WHERE p.productDeleteFlag = :deleteFlag AND p.itemCode = :itemCode";
					List<ProductMaster> productMasters = sf.getCurrentSession().createQuery(hql)
							.setParameter("deleteFlag", 0).setParameter("itemCode", itemMasterNew.getItemCode()).list();

					if (productMasters.size() > 0) {

						ProductMaster productMaster = productMasters.get(0);
						productMaster.setProductId(productMasters.get(0).getProductId());

						productMaster.setProductName(itemMasterNew.getItemName());
						productMaster.setProductShortName(itemMasterNew.getItemShName());
						productMaster.setProductDeleteFlag(0);
						productMaster.setItemCode(itemMasterNew.getItemCode());
						productMaster.setItemMasterId(itemMasterNew.getId());
						productMaster.setProductUnit(0.0);
						// start uom details

						String sqlUomCount = " select count(*) from pharma_uom_master where uom_name='"
								+ itemMasterNew.getPackName() + "' and uom_delete_flag=0 ";
						int uomCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlUomCount).uniqueResult())
								.intValue();

						if (uomCount == 0) {
							UomMaster uomMaster = productMaster.getUomMaster();
							uomMaster.setUomName(itemMasterNew.getPackName());
							uomMaster.setUomCode(itemMasterNew.getPackCode());
							uomMaster.setUomDeleteFlag(0);
							UomMaster uomMasterDB = (UomMaster) sf.getCurrentSession().merge(uomMaster);
							if (uomMasterDB != null)
								productMaster.setUomMaster(uomMasterDB);
						} else {
							Criteria cPack = sf.getCurrentSession().createCriteria(UomMaster.class);
							cPack.add(Restrictions.eq("uomName", itemMasterNew.getPackName()));
							cPack.add(Restrictions.eq("uomDeleteFlag", 0));
							List<UomMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setUomMaster(listPack.get(listPack.size() - 1));
							}
						}
						// End Uom Details

						// start Preparation Details

						String sqlPrepCount = " select count(*) from pharma_preparation_master where preparation_name='"
								+ itemMasterNew.getItemGrpName() + "' and preparation_delete_flag=0 ";
						int prepCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlPrepCount).uniqueResult())
								.intValue();

						if (prepCount == 0) {
							PreparationMaster preparationMaster = productMaster.getPreparationMaster();
							preparationMaster.setPreparationName(itemMasterNew.getItemGrpName());
							preparationMaster.setPreparationCode(itemMasterNew.getItemGrpCode());
							preparationMaster.setPreparationDeleteFlag(0);
							PreparationMaster preparationMasterDB = (PreparationMaster) sf.getCurrentSession()
									.merge(preparationMaster);
							if (preparationMasterDB != null)
								productMaster.setPreparationMaster(preparationMasterDB);
						} else {

							Criteria cPack = sf.getCurrentSession().createCriteria(PreparationMaster.class);
							cPack.add(Restrictions.eq("preparationName", itemMasterNew.getItemGrpName()));
							cPack.add(Restrictions.eq("preparationDeleteFlag", 0));
							List<PreparationMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setPreparationMaster(listPack.get(listPack.size() - 1));
							}

						}

						// End Prep Details

						// Start Strength Details

						String sqlStrengthCount = " select count(*) from pharma_strength_master where strength_name='"
								+ itemMasterNew.getItemQtyBox() + "' and strength_delete_flag=0 ";
						int strenghtCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlStrengthCount)
								.uniqueResult()).intValue();

						if (strenghtCount == 0) {
							StrengthMaster strengthMaster = productMaster.getStrengthMaster();
							strengthMaster.setStrengthName(itemMasterNew.getItemQtyBox());
							strengthMaster.setStrengthDeleteFlag(0);
							StrengthMaster strengthMasterDB = (StrengthMaster) sf.getCurrentSession()
									.merge(strengthMaster);
							if (strengthMasterDB != null)
								productMaster.setStrengthMaster(strengthMasterDB);
						} else {
							Criteria cPack = sf.getCurrentSession().createCriteria(StrengthMaster.class);
							cPack.add(Restrictions.eq("strengthName", itemMasterNew.getItemQtyBox()));
							cPack.add(Restrictions.eq("strengthDeleteFlag", 0));
							List<StrengthMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setStrengthMaster(listPack.get(listPack.size() - 1));
							}
						}

						// End Strength Details

						// Start Drug Details

						String sqlDrugCount = " select count(*) from pharma_drug_master where drug_name='"
								+ itemMasterNew.getContName() + "' and drug_delete_flag=0 ";
						int drugCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlDrugCount).uniqueResult())
								.intValue();
						if (drugCount == 0) {
							DrugMaster drugMaster = productMaster.getDrugMaster();
							drugMaster.setDrugName(itemMasterNew.getContName());
							drugMaster.setDrugCode(itemMasterNew.getContCode());
							drugMaster.setDrugDeleteFlag(0);

							DrugMaster drugMasterDB = (DrugMaster) sf.getCurrentSession().merge(drugMaster);
							if (drugMasterDB != null)
								productMaster.setDrugMaster(drugMasterDB);
						} else {

							Criteria cPack = sf.getCurrentSession().createCriteria(DrugMaster.class);
							cPack.add(Restrictions.eq("drugName", itemMasterNew.getContName()));
							cPack.add(Restrictions.eq("drugDeleteFlag", 0));
							List<DrugMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setDrugMaster(listPack.get(listPack.size() - 1));
							}

						}
						// End Drug Details

						if (packingMasterDB != null)
							productMaster.setPackingMaster(packingMasterDB);

						if (hsnMasterDB != null)
							productMaster.setHsnMaster(hsnMasterDB);

						if (companyMasterDB != null)
							productMaster.setCompanyMaster(companyMasterDB);

						if (selfobj != null)
							productMaster.setShelfMaster(selfobj);

						if (categoryMasterDB != null)
							productMaster.setCategoryMaster(categoryMasterDB);

						if (taxobj != null)
							productMaster.setTaxMaster(taxobj);

						sf.getCurrentSession().merge(productMaster);
					} else {

						ProductMaster productMaster = new ProductMaster();
						productMaster.setProductName(itemMasterNew.getItemName());
						productMaster.setProductShortName(itemMasterNew.getItemName());
						productMaster.setProductDeleteFlag(0);
						productMaster.setItemCode(itemMasterNew.getItemCode());
						productMaster.setItemMasterId(itemMasterNew.getId());
						productMaster.setProductUnit(0.0);

						// start uom details
						String sqlUomCount = " select count(*) from pharma_uom_master where uom_name='"	+ itemMasterNew.getPackName() + "' and uom_delete_flag=0 ";
						int uomCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlUomCount).uniqueResult()).intValue();

						if (uomCount == 0) {
							UomMaster uomMaster = new UomMaster();
							uomMaster.setUomName(itemMasterNew.getPackName());
							uomMaster.setUomDeleteFlag(0);
							uomMaster.setUomCode(itemMasterNew.getPackCode());
							UomMaster uomMasterDB = (UomMaster) sf.getCurrentSession().merge(uomMaster);
							if (uomMasterDB != null)
								productMaster.setUomMaster(uomMasterDB);
						} else {
							Criteria cPack = sf.getCurrentSession().createCriteria(UomMaster.class);
							cPack.add(Restrictions.eq("uomName", itemMasterNew.getPackName()));
							cPack.add(Restrictions.eq("uomDeleteFlag", 0));
							List<UomMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setUomMaster(listPack.get(listPack.size() - 1));
							}
						}
						// End Uom Details

						// start Preparation Details
						String sqlPrepCount = " select count(*) from pharma_preparation_master where preparation_name='" + itemMasterNew.getItemGrpName() + "' and preparation_delete_flag=0 ";
						int prepCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlPrepCount).uniqueResult()).intValue();

						if (prepCount == 0) {
							PreparationMaster preparationMaster = new PreparationMaster();
							preparationMaster.setPreparationName(itemMasterNew.getItemGrpName());
							preparationMaster.setPreparationCode(itemMasterNew.getItemGrpCode());
							preparationMaster.setPreparationDeleteFlag(0);
							PreparationMaster preparationMasterDB = (PreparationMaster) sf.getCurrentSession().merge(preparationMaster);
							if (preparationMasterDB != null)
								productMaster.setPreparationMaster(preparationMasterDB);
						} else {

							Criteria cPack = sf.getCurrentSession().createCriteria(PreparationMaster.class);
							cPack.add(Restrictions.eq("preparationName", itemMasterNew.getItemGrpName()));
							cPack.add(Restrictions.eq("preparationDeleteFlag", 0));
							List<PreparationMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setPreparationMaster(listPack.get(listPack.size() - 1));
							}
						}
						// End Preparation Details

						// Start Strength Details

						String sqlStrengthCount = " select count(*) from pharma_strength_master where strength_name='" + itemMasterNew.getItemQtyBox() + "' and strength_delete_flag=0 ";
						int strenghtCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlStrengthCount).uniqueResult()).intValue();

						if (strenghtCount == 0) {
							StrengthMaster strengthMaster = new StrengthMaster();
							strengthMaster.setStrengthName(itemMasterNew.getItemQtyBox());
							strengthMaster.setStrengthDeleteFlag(0);
							StrengthMaster strengthMasterDB = (StrengthMaster) sf.getCurrentSession().merge(strengthMaster);
							if (strengthMasterDB != null)
								productMaster.setStrengthMaster(strengthMasterDB);
						} else {
							Criteria cPack = sf.getCurrentSession().createCriteria(StrengthMaster.class);
							cPack.add(Restrictions.eq("strengthName", itemMasterNew.getItemQtyBox()));
							cPack.add(Restrictions.eq("strengthDeleteFlag", 0));
							List<StrengthMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setStrengthMaster(listPack.get(listPack.size() - 1));
							}
						}
						// End Strength Details

						// Start Drug Details

						String sqlDrugCount = " select count(*) from pharma_drug_master where drug_name='"+ itemMasterNew.getContName() + "' and drug_delete_flag=0 ";
						int drugCount = ((Number) sf.getCurrentSession().createSQLQuery(sqlDrugCount).uniqueResult()).intValue();
						if (drugCount == 0) {
							DrugMaster drugMaster = new DrugMaster();
							drugMaster.setDrugName(itemMasterNew.getContName());
							drugMaster.setDrugCode(itemMasterNew.getContCode());
							drugMaster.setDrugDeleteFlag(0);

							DrugMaster drugMasterDB = (DrugMaster) sf.getCurrentSession().merge(drugMaster);
							if (drugMasterDB != null)
								productMaster.setDrugMaster(drugMasterDB);
						} else {

							Criteria cPack = sf.getCurrentSession().createCriteria(DrugMaster.class);
							cPack.add(Restrictions.eq("drugName", itemMasterNew.getContName()));
							cPack.add(Restrictions.eq("drugDeleteFlag", 0));
							List<DrugMaster> listPack = cPack.list();
							if (listPack.size() > 0) {
								productMaster.setDrugMaster(listPack.get(listPack.size() - 1));
							}
						}
						// End Drug Details
						
						if (packingMasterDB != null)
							productMaster.setPackingMaster(packingMasterDB);

						if (companyMasterDB != null)
							productMaster.setCompanyMaster(companyMasterDB);
						
						if (selfobj != null)
							productMaster.setShelfMaster(selfobj);

						if (categoryMasterDB != null)
							productMaster.setCategoryMaster(categoryMasterDB);

						if (taxobj != null)
							productMaster.setTaxMaster(taxobj);

						if (hsnMasterDB != null)
							productMaster.setHsnMaster(hsnMasterDB);

						sf.getCurrentSession().merge(productMaster);
					}
				});
				return "1";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return "0";
	}

	@SuppressWarnings("unchecked")
	@Override
	public String addNewProducts(ItemMstGenericResponse[] genericRequest) {

		if (genericRequest.length > 0) {

			List<ItemMstGenericResponse> asList = Arrays.asList(genericRequest);
			asList.forEach(eco -> {

				EcoGreenItemMasterNew itemMasterNew = new EcoGreenItemMasterNew();
				try {
					BeanUtils.copyProperties(itemMasterNew, eco);
				} catch (IllegalAccessException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				String hql2 = "FROM EcoGreenItemMasterNew p WHERE p.deleted = :deleteFlag AND p.itemCode = :itemCode";
				List<EcoGreenItemMasterNew> list = sf.getCurrentSession().createQuery(hql2)
						.setParameter("deleteFlag", "N").setParameter("itemCode", itemMasterNew.getItemCode()).list();
				
				if (list.size() > 0) {

					itemMasterNew.setId(list.get(0).getId());
					sf.getCurrentSession().merge(itemMasterNew);

					String hql = "FROM ProductMaster p WHERE p.productDeleteFlag = :deleteFlag AND p.itemCode = :itemCode";
					List<ProductMaster> productMasters = sf.getCurrentSession().createQuery(hql)
							.setParameter("deleteFlag", 0).setParameter("itemCode", itemMasterNew.getItemCode()).list();

					if (productMasters.size() > 0) {

						ProductMaster productMaster = productMasters.get(0);
						productMaster.setProductId(productMasters.get(0).getProductId());

						productMaster.setProductName(itemMasterNew.getItemName());
						productMaster.setProductShortName(itemMasterNew.getItemShName());
						productMaster.setProductDeleteFlag(0);
						productMaster.setItemCode(itemMasterNew.getItemCode());
						productMaster.setItemMasterId(itemMasterNew.getId());

						// for pack details start 
						String sqlPackCount=" select count(*) from pharma_packing_master where pack_type='"+itemMasterNew.getPackTypeCode()+"' and pack_delete_flag=0 ";
						int packCount=((Number) sf.getCurrentSession().createSQLQuery(sqlPackCount).uniqueResult()).intValue();

						if(packCount == 0) {
							  PackingMaster packingMaster = productMaster.getPackingMaster();
							   packingMaster.setPackDeleteFlag(0);
							  packingMaster.setPackType(itemMasterNew.getPackTypeCode());
						       PackingMaster packingMasterDB = (PackingMaster) sf.getCurrentSession().merge(packingMaster);
						      if (packingMasterDB != null)
							     productMaster.setPackingMaster(packingMasterDB);
						}else {
								Criteria cPack = sf.getCurrentSession().createCriteria(PackingMaster.class);
								cPack.add(Restrictions.eq("packType", itemMasterNew.getPackTypeCode()));
								cPack.add(Restrictions.eq("packDeleteFlag", 0));
								 List<PackingMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setPackingMaster(listPack.get(listPack.size()-1));
								  }
						} 
						
						// pack details end 

                           // start uom details
						
						String sqlUomCount=" select count(*) from pharma_uom_master where uom_name='"+itemMasterNew.getPackName()+"' and uom_delete_flag=0 ";
						int uomCount=((Number) sf.getCurrentSession().createSQLQuery(sqlUomCount).uniqueResult()).intValue();
						
						if(uomCount == 0) {
							UomMaster uomMaster = productMaster.getUomMaster();
							uomMaster.setUomName(itemMasterNew.getPackName());
							uomMaster.setUomDeleteFlag(0);
							UomMaster uomMasterDB = (UomMaster) sf.getCurrentSession().merge(uomMaster);
							if (uomMasterDB != null)
								productMaster.setUomMaster(uomMasterDB);
						}else {
							Criteria cPack = sf.getCurrentSession().createCriteria(UomMaster.class);
							cPack.add(Restrictions.eq("uomName", itemMasterNew.getPackName()));
							cPack.add(Restrictions.eq("uomDeleteFlag", 0));
							 List<UomMaster> listPack=cPack.list();
							  if(listPack.size()  > 0) {
								  productMaster.setUomMaster(listPack.get(listPack.size()-1));
							  }
						}
						// End Uom Details

						HsnMaster hsnMaster = new HsnMaster();
						hsnMaster.setDeleteFlag(0);
						hsnMaster.setHsnNo("0");
						HsnMaster hsnMasterDB = (HsnMaster) sf.getCurrentSession().merge(hsnMaster);
						if (hsnMasterDB != null)
							productMaster.setHsnMaster(hsnMasterDB);

						// start Preparation Details

						String sqlPrepCount=" select count(*) from pharma_preparation_master where preparation_name='"+itemMasterNew.getItemGrpName()+"' and preparation_delete_flag=0 ";
						int prepCount=((Number) sf.getCurrentSession().createSQLQuery(sqlPrepCount).uniqueResult()).intValue();
						
						 if(prepCount == 0) {
								PreparationMaster preparationMaster = productMaster.getPreparationMaster();
								preparationMaster.setPreparationName(itemMasterNew.getItemGrpName());
								preparationMaster.setPreparationDeleteFlag(0);
								PreparationMaster preparationMasterDB = (PreparationMaster) sf.getCurrentSession()
										.merge(preparationMaster);
								if (preparationMasterDB != null)
									productMaster.setPreparationMaster(preparationMasterDB);
						  }else {

								Criteria cPack = sf.getCurrentSession().createCriteria(PreparationMaster.class);
								cPack.add(Restrictions.eq("preparationName", itemMasterNew.getItemGrpName()));
								cPack.add(Restrictions.eq("preparationDeleteFlag", 0));
								 List<PreparationMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setPreparationMaster(listPack.get(listPack.size()-1));
								  }
							
						  }
						 
						 // End Prep Details

                         // Start Strength Details
						 
						 String sqlStrengthCount=" select count(*) from pharma_strength_master where strength_name='"+itemMasterNew.getItemQtyBox()+"' and strength_delete_flag=0 ";
							int strenghtCount=((Number) sf.getCurrentSession().createSQLQuery(sqlStrengthCount).uniqueResult()).intValue();
						 
							if(strenghtCount == 0) {
										StrengthMaster strengthMaster = productMaster.getStrengthMaster();
										strengthMaster.setStrengthName(itemMasterNew.getItemQtyBox());
										strengthMaster.setStrengthDeleteFlag(0);
										StrengthMaster strengthMasterDB = (StrengthMaster) sf.getCurrentSession().merge(strengthMaster);
										if (strengthMasterDB != null)
											productMaster.setStrengthMaster(strengthMasterDB);
							}else {
								Criteria cPack = sf.getCurrentSession().createCriteria(StrengthMaster.class);
								cPack.add(Restrictions.eq("strengthName", itemMasterNew.getItemQtyBox()));
								cPack.add(Restrictions.eq("strengthDeleteFlag", 0));
								 List<StrengthMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setStrengthMaster(listPack.get(listPack.size()-1));
								  }
							}
							
					   // End Strength Details

							// Start Drug Details 
							
							 String sqlDrugCount=" select count(*) from pharma_drug_master where drug_name='"+itemMasterNew.getItemName()+"' and drug_delete_flag=0 ";
								int drugCount=((Number) sf.getCurrentSession().createSQLQuery(sqlDrugCount).uniqueResult()).intValue();
                       if(drugCount == 0) {
								DrugMaster drugMaster = productMaster.getDrugMaster();
								drugMaster.setDrugName(itemMasterNew.getItemName());
								drugMaster.setDrugDeleteFlag(0);
		
								DrugMaster drugMasterDB = (DrugMaster) sf.getCurrentSession().merge(drugMaster);
								if (drugMasterDB != null)
									productMaster.setDrugMaster(drugMasterDB);
                       }else {

							Criteria cPack = sf.getCurrentSession().createCriteria(DrugMaster.class);
							cPack.add(Restrictions.eq("drugName", itemMasterNew.getItemName()));
							cPack.add(Restrictions.eq("drugDeleteFlag", 0));
							 List<DrugMaster> listPack=cPack.list();
							  if(listPack.size()  > 0) {
								  productMaster.setDrugMaster(listPack.get(listPack.size()-1));
							  }
						
                       }
                       // End Drug Details

                       // Strat Company Details
                     	 String sqlCompanyCount=" select count(*) from pharma_company_master where comp_name='"+itemMasterNew.getContName()+"' and comp_delete_flag=0 ";
  						int compCount=((Number) sf.getCurrentSession().createSQLQuery(sqlCompanyCount).uniqueResult()).intValue();
  						
  						if(compCount == 0) {
  							CompanyMaster companyMaster = productMaster.getCompanyMaster();
  							companyMaster.setCompName(itemMasterNew.getContName());
  							companyMaster.setCompDeleteFlag(0);
  							companyMaster.setCompShortName(itemMasterNew.getContCode());
  							CompanyMaster companyMasterDB = (CompanyMaster) sf.getCurrentSession().merge(companyMaster);
  	
  							if (companyMasterDB != null)
  								productMaster.setCompanyMaster(companyMasterDB);
  						}else {
  							Criteria cPack = sf.getCurrentSession().createCriteria(CompanyMaster.class);
  							cPack.add(Restrictions.eq("compName", itemMasterNew.getContName()));
  							cPack.add(Restrictions.eq("compDeleteFlag", 0));
  							 List<CompanyMaster> listPack=cPack.list();
  							  if(listPack.size()  > 0) {
  								  productMaster.setCompanyMaster(listPack.get(listPack.size()-1));
  							  }
  						}
  						
  						// End Company Details


						ShelfMaster shelfMaster = productMaster.getShelfMaster();
						shelfMaster.setShelfName("-");
						shelfMaster.setShelfDeleteFlag(0);
						ShelfMaster selfobj = (ShelfMaster) sf.getCurrentSession().merge(shelfMaster);

						if (selfobj != null)
							productMaster.setShelfMaster(selfobj);

						CategoryMaster categoryMaster = productMaster.getCategoryMaster();
						categoryMaster.setCatDeleteFlag(0);
						categoryMaster.setCatName("-");
						CategoryMaster categoryMasterDB = (CategoryMaster) sf.getCurrentSession().merge(categoryMaster);

						if (categoryMasterDB != null)
							productMaster.setCategoryMaster(categoryMasterDB);

						TaxMaster taxMaster = productMaster.getTaxMaster();
						taxMaster.setTaxDeleteFlag(0);
						taxMaster.setTaxName("-");
						TaxMaster taxobj = (TaxMaster) sf.getCurrentSession().merge(taxMaster);

						if (taxobj != null)
							productMaster.setTaxMaster(taxobj);

						sf.getCurrentSession().merge(productMaster);

					} else {

						sf.getCurrentSession().merge(itemMasterNew);
						ProductMaster productMaster = new ProductMaster();

						productMaster.setProductName(itemMasterNew.getItemName());
						productMaster.setProductShortName(itemMasterNew.getItemShName());
						productMaster.setProductDeleteFlag(0);
						productMaster.setItemCode(itemMasterNew.getItemCode());
						productMaster.setItemMasterId(itemMasterNew.getId());

						// for pack details start 
						String sqlPackCount=" select count(*) from pharma_packing_master where pack_type='"+itemMasterNew.getPackTypeCode()+"' and pack_delete_flag=0 ";
						int packCount=((Number) sf.getCurrentSession().createSQLQuery(sqlPackCount).uniqueResult()).intValue();

						if(packCount == 0) {
							  PackingMaster packingMaster = new PackingMaster();
							   packingMaster.setPackDeleteFlag(0);
							  packingMaster.setPackType(itemMasterNew.getPackTypeCode());
						       PackingMaster packingMasterDB = (PackingMaster) sf.getCurrentSession().merge(packingMaster);
						      if (packingMasterDB != null)
							     productMaster.setPackingMaster(packingMasterDB);
						}else {
								Criteria cPack = sf.getCurrentSession().createCriteria(PackingMaster.class);
								cPack.add(Restrictions.eq("packType", itemMasterNew.getPackTypeCode()));
								cPack.add(Restrictions.eq("packDeleteFlag", 0));
								 List<PackingMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setPackingMaster(listPack.get(listPack.size()-1));
								  }
						} 
						
						// pack details end 

                           // start uom details
						
						String sqlUomCount=" select count(*) from pharma_uom_master where uom_name='"+itemMasterNew.getPackName()+"' and uom_delete_flag=0 ";
						int uomCount=((Number) sf.getCurrentSession().createSQLQuery(sqlUomCount).uniqueResult()).intValue();
						
						if(uomCount == 0) {
							UomMaster uomMaster = new UomMaster();
							uomMaster.setUomName(itemMasterNew.getPackName());
							uomMaster.setUomDeleteFlag(0);
							UomMaster uomMasterDB = (UomMaster) sf.getCurrentSession().merge(uomMaster);
							if (uomMasterDB != null)
								productMaster.setUomMaster(uomMasterDB);
						}else {
							Criteria cPack = sf.getCurrentSession().createCriteria(UomMaster.class);
							cPack.add(Restrictions.eq("uomName", itemMasterNew.getPackName()));
							cPack.add(Restrictions.eq("uomDeleteFlag", 0));
							 List<UomMaster> listPack=cPack.list();
							  if(listPack.size()  > 0) {
								  productMaster.setUomMaster(listPack.get(listPack.size()-1));
							  }
						}
						// End Uom Details

						HsnMaster hsnMaster = new HsnMaster();
						hsnMaster.setDeleteFlag(0);
						hsnMaster.setHsnNo("0");
						HsnMaster hsnMasterDB = (HsnMaster) sf.getCurrentSession().merge(hsnMaster);
						if (hsnMasterDB != null)
							productMaster.setHsnMaster(hsnMasterDB);

						// start Preparation Details

						String sqlPrepCount=" select count(*) from pharma_preparation_master where preparation_name='"+itemMasterNew.getItemGrpName()+"' and preparation_delete_flag=0 ";
						int prepCount=((Number) sf.getCurrentSession().createSQLQuery(sqlPrepCount).uniqueResult()).intValue();
						
						 if(prepCount == 0) {
								PreparationMaster preparationMaster = new PreparationMaster();
								preparationMaster.setPreparationName(itemMasterNew.getItemGrpName());
								preparationMaster.setPreparationDeleteFlag(0);
								PreparationMaster preparationMasterDB = (PreparationMaster) sf.getCurrentSession()
										.merge(preparationMaster);
								if (preparationMasterDB != null)
									productMaster.setPreparationMaster(preparationMasterDB);
						  }else {

								Criteria cPack = sf.getCurrentSession().createCriteria(PreparationMaster.class);
								cPack.add(Restrictions.eq("preparationName", itemMasterNew.getItemGrpName()));
								cPack.add(Restrictions.eq("preparationDeleteFlag", 0));
								 List<PreparationMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setPreparationMaster(listPack.get(listPack.size()-1));
								  }
							
						  }
						 
						 // End Prep Details

                         // Start Strength Details
						 
						 String sqlStrengthCount=" select count(*) from pharma_strength_master where strength_name='"+itemMasterNew.getItemQtyBox()+"' and strength_delete_flag=0 ";
							int strenghtCount=((Number) sf.getCurrentSession().createSQLQuery(sqlStrengthCount).uniqueResult()).intValue();
						 
							if(strenghtCount == 0) {
										StrengthMaster strengthMaster = new StrengthMaster();
										strengthMaster.setStrengthName(itemMasterNew.getItemQtyBox());
										strengthMaster.setStrengthDeleteFlag(0);
										StrengthMaster strengthMasterDB = (StrengthMaster) sf.getCurrentSession().merge(strengthMaster);
										if (strengthMasterDB != null)
											productMaster.setStrengthMaster(strengthMasterDB);
							}else {
								Criteria cPack = sf.getCurrentSession().createCriteria(StrengthMaster.class);
								cPack.add(Restrictions.eq("strengthName", itemMasterNew.getItemQtyBox()));
								cPack.add(Restrictions.eq("strengthDeleteFlag", 0));
								 List<StrengthMaster> listPack=cPack.list();
								  if(listPack.size()  > 0) {
									  productMaster.setStrengthMaster(listPack.get(listPack.size()-1));
								  }
							}
							
					   // End Strength Details

							// Start Drug Details 
							
							 String sqlDrugCount=" select count(*) from pharma_drug_master where drug_name='"+itemMasterNew.getItemName()+"' and drug_delete_flag=0 ";
								int drugCount=((Number) sf.getCurrentSession().createSQLQuery(sqlDrugCount).uniqueResult()).intValue();
                       if(drugCount == 0) {
								DrugMaster drugMaster = new DrugMaster();
								drugMaster.setDrugName(itemMasterNew.getItemName());
								drugMaster.setDrugDeleteFlag(0);
		
								DrugMaster drugMasterDB = (DrugMaster) sf.getCurrentSession().merge(drugMaster);
								if (drugMasterDB != null)
									productMaster.setDrugMaster(drugMasterDB);
                       }else {

							Criteria cPack = sf.getCurrentSession().createCriteria(DrugMaster.class);
							cPack.add(Restrictions.eq("drugName", itemMasterNew.getItemName()));
							cPack.add(Restrictions.eq("drugDeleteFlag", 0));
							 List<DrugMaster> listPack=cPack.list();
							  if(listPack.size()  > 0) {
								  productMaster.setDrugMaster(listPack.get(listPack.size()-1));
							  }
						
                       }
                       // End Drug Details

                       // Strat Company Details
                     	 String sqlCompanyCount=" select count(*) from pharma_company_master where comp_name='"+itemMasterNew.getContName()+"' and comp_delete_flag=0 ";
  						int compCount=((Number) sf.getCurrentSession().createSQLQuery(sqlCompanyCount).uniqueResult()).intValue();
  						
  						if(compCount == 0) {
  							CompanyMaster companyMaster = new CompanyMaster();
  							companyMaster.setCompName(itemMasterNew.getContName());
  							companyMaster.setCompDeleteFlag(0);
  							companyMaster.setCompShortName(itemMasterNew.getContCode());
  							CompanyMaster companyMasterDB = (CompanyMaster) sf.getCurrentSession().merge(companyMaster);
  	
  							if (companyMasterDB != null)
  								productMaster.setCompanyMaster(companyMasterDB);
  						}else {
  							Criteria cPack = sf.getCurrentSession().createCriteria(CompanyMaster.class);
  							cPack.add(Restrictions.eq("compName", itemMasterNew.getContName()));
  							cPack.add(Restrictions.eq("compDeleteFlag", 0));
  							 List<CompanyMaster> listPack=cPack.list();
  							  if(listPack.size()  > 0) {
  								  productMaster.setCompanyMaster(listPack.get(listPack.size()-1));
  							  }
  						}
  						
  						// End Company Details

						ShelfMaster shelfMaster = new ShelfMaster();
						shelfMaster.setShelfName("-");
						shelfMaster.setShelfDeleteFlag(0);
						ShelfMaster selfobj = (ShelfMaster) sf.getCurrentSession().merge(shelfMaster);

						if (selfobj != null)
							productMaster.setShelfMaster(selfobj);

						CategoryMaster categoryMaster = new CategoryMaster();
						categoryMaster.setCatDeleteFlag(0);
						categoryMaster.setCatName("-");
						CategoryMaster categoryMasterDB = (CategoryMaster) sf.getCurrentSession().merge(categoryMaster);

						if (categoryMasterDB != null)
							productMaster.setCategoryMaster(categoryMasterDB);

						TaxMaster taxMaster = new TaxMaster();
						taxMaster.setTaxDeleteFlag(0);
						taxMaster.setTaxName("-");
						TaxMaster taxobj = (TaxMaster) sf.getCurrentSession().merge(taxMaster);

						if (taxobj != null)
							productMaster.setTaxMaster(taxobj);

						sf.getCurrentSession().merge(productMaster);

					}
				}
			});
			// TODO Auto-generated method stub
			return "1";
		}
		return "0";
	}

	@Override
	public PharamIndentResponseDTO getIndentDetails(String fromDate, String toDate) {
		
		PharamIndentResponseDTO obj=new PharamIndentResponseDTO();
		
		List<PharmaIndentMasterDTO> lstPharmaMaster=new ArrayList<>();
		List<Integer> lstTreat=new ArrayList<>();// added  unique treatment id 
		 try {
			 Query querySp = sf.getCurrentSession().createSQLQuery("call sp_get_indent_details(:fromDate,:toDate)");
			 querySp.setParameter("fromDate", fromDate);
				querySp.setParameter("toDate", toDate);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PharmaIndentSPDTO.class));
			
				@SuppressWarnings("unchecked")
				   List<PharmaIndentSPDTO> lstIndentsp = querySp.list();
				for(  PharmaIndentSPDTO psp  :lstIndentsp) {
					        if(!lstTreat.contains(psp.getIndentMasterId())) {
					        	PharmaIndentMasterDTO mobj=new PharmaIndentMasterDTO();
					        	mobj.setIndentMasterId(psp.getIndentMasterId());
					        	mobj.setStoreId(psp.getStoreId());
					        	mobj.setIndentDate(psp.getIndentDate());
					        	mobj.setIndentStatus(psp.getIndentStatus());
					        	mobj.setPatientId(psp.getPatientId());
					        	mobj.setTreatmentId(psp.getTreatmentId());
					        	mobj.setPatientName(psp.getPatientName());
					        	lstTreat.add(psp.getIndentMasterId());
					        	lstPharmaMaster.add(mobj);
					        }
				}
				
				for(PharmaIndentMasterDTO mobj :lstPharmaMaster) {
					List<PharmaIndentSlaveDTO> lstPharmaSlave=new ArrayList<>();
					        for(PharmaIndentSPDTO psp  :lstIndentsp) {
					        	
					        	  if(mobj.getIndentMasterId() == psp.getIndentMasterId()) {
					        		  PharmaIndentSlaveDTO sobj=new PharmaIndentSlaveDTO();
					        		 sobj.setItemCode(psp.getItemCode());
					        		 sobj.setItemName(psp.getItemName());
					        		 sobj.setItemRequireQty(psp.getItemRequireQty());
					        		 lstPharmaSlave.add(sobj);
					        	  }
					        }
					        mobj.setLstItemList(lstPharmaSlave);
				}
				
				obj.setLstItemDetails(lstPharmaMaster);
				
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int updateIndentStatus(PharmaUpdateIndentPayload obj) {
		    try {
		    	if(obj.getCallFrom().equalsIgnoreCase("indent")) {
		    	Query itemInfo = sf	.getCurrentSession().createQuery("update IndentMaster set indentStatus='"+obj.getStatus()+"' where indentId="+Integer.parseInt(obj.getOrderNo())+" ");//hql
				itemInfo.executeUpdate();
				return 1;
		    	}else if(obj.getCallFrom().equalsIgnoreCase("prescrption")) {
		    		Query itemInfo = sf	.getCurrentSession().createQuery("update OPDPrescriptionDto set remark='"+obj.getStatus()+"' where ecogreenPrescrptionId="+Integer.parseInt(obj.getOrderNo())+" ");//hql
					itemInfo.executeUpdate();
					return 1;
		    	}
		    }catch (Exception e) {
				
			}
		return 0;
	}
	

	@Override
	public PharmaSaleOrderMasterDTO getStockDetails() {
		ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
		String SALE_ORDER_URL = bundle.getObject("SALE_ORDER_URL").toString();
		
		PharmaSaleOrderMasterDTO obj=null;
		  try {
			  Query querySpMaster = sf	.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_master_details(:p_indentmasterid)");
			  querySpMaster.setParameter("p_indentmasterid", 85);
			  querySpMaster.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderMasterDTO.class));
				@SuppressWarnings("unchecked")
				List<PharmaSaleOrderMasterDTO> lstmaster = querySpMaster.list();
				if(lstmaster.size() > 0) {
					obj=lstmaster.get(0);
					obj.setRemark("indent");
					  Query querySpSlave = sf	.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_slave_details(:p_indentmasterid)");
					  querySpSlave.setParameter("p_indentmasterid", Integer.parseInt(obj.getOrder_no()));
					  querySpSlave.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderSlaveDTO.class));
						@SuppressWarnings("unchecked")
						List<PharmaSaleOrderSlaveDTO> lstSlave = querySpSlave.list();
						
						
						  obj.setItem(lstSlave);
						
						  ObjectMapper w=new ObjectMapper();
						 String s="";
						 try {
							 s=w.writeValueAsString(obj);
							
						} catch (JsonProcessingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
  
						System.out.println("ENtity  ==============="+s);
						 HttpEntity<String> entity = new HttpEntity<String>(s);
						// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
					 ResponseEntity<String> responseEntity = restTemplate.exchange(SALE_ORDER_URL, HttpMethod.POST,entity,String.class);
					   String list = responseEntity.getBody();
					   System.out.println("Response  ==============="+list);
				}
			    
		  }catch (Exception e) {
			// TODO: handle exception
		}
		return obj;
	}

	@Override
	public ResponseEntity<Object> fechStock() {
		
		ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
		String FETCH_STOCK = bundle.getObject("FETCH_STOCK").toString();
		 try {
			 List<PharmaFetchSlaveStockDTO> list=new ArrayList<>();
			 PharmaFetchSlaveStockDTO obj=new PharmaFetchSlaveStockDTO();
			 obj.setItemCode("H00159");
			  list.add(obj);
			  
			  PharmaFetchMasterStockDTO mobj=new PharmaFetchMasterStockDTO();
			  mobj.setItemDetails(list);
			  
			  ObjectMapper w=new ObjectMapper();
				 String s="";
				 String newS="";
				 try {
					 s=w.writeValueAsString(mobj);
					 newS="http_var_json="+s;
					
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}

				System.out.println("Fetch Stock Request  ==============="+newS);
				
				 HttpHeaders headers = new HttpHeaders();
				 headers.setContentType(MediaType.APPLICATION_JSON);
				 headers.set("Content-Type", "application/x-www-form-urlencoded");
				 HttpEntity<String> entity = new HttpEntity<String>(newS,headers);
					// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
				 ResponseEntity<String> responseEntity = restTemplate.exchange(FETCH_STOCK, HttpMethod.POST,entity,String.class);
				   String res = responseEntity.getBody();
				   System.out.println("Response  ==============="+res);
				   
				   PharmaFetchStockResponseDTO objp =null;
				   PharmaFetchStockValidationMasterDTO vobj=null;
			         try {
			        	  //Object obres = w.readValue(res,Object.class);
			        	  //System.out.println("obres  ==============="+obres.toString());
			        	 
			        	  @SuppressWarnings("unchecked")
						Map<String, Object> jsonMap = w.readValue(res, Map.class);
			        	  String StatusCode = (String) jsonMap.get("StatusCode");
			        	  System.out.println("StatusCode  ==============="+StatusCode);
			        	  if(Integer.parseInt(StatusCode) == 400 ) {
			        		  PharmaFetchStockValidationMasterDTO vaobj = w.readValue(res,PharmaFetchStockValidationMasterDTO.class);
			        		  System.out.println("StatusCode  ==============="+vaobj.getStatus());
			        		  return  new ResponseEntity<>(vaobj,HttpStatus.OK);
			        	  }else if(Integer.parseInt(StatusCode) == 200 ) {
			        		  PharmaFetchStockResponseDTO vaobj = w.readValue(res,PharmaFetchStockResponseDTO.class);
			        		  System.out.println("StatusCode  ==============="+vaobj.getStatus());
			        		  System.out.println("stock ==="+vaobj.getItemdetails().get(0).getItemQtyDetyails().get(0).getTotalAvailableQuantity());
			        		  return  new ResponseEntity<>(vaobj,HttpStatus.OK);
			        	  }
						
					} catch (JsonMappingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					} catch (JsonProcessingException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
			         
			         return  new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		 }catch (Exception e) {
			e.printStackTrace();
		}
		 return null ;
	}

	@Override
	public ResponseEntity<PharmaIndentErrorDTO> sendPrescptionToEcogreen(String prescrptionIds) {
		      
		     try {
		    	 Session session=sf.openSession();
					Transaction tr=session.beginTransaction();
		    	    int maxPrescptionIdCount=0;
		    	    
		    	    String sql="select  max(ecogreen_prescription_id) from opd_prescription";
		    	   SQLQuery sq =session.createSQLQuery(sql);
		    	   maxPrescptionIdCount= ((Number) sq.uniqueResult()).intValue();
		    	   maxPrescptionIdCount=maxPrescptionIdCount+1;
		    	   String prescriptionArrId [] = prescrptionIds.split(",");
		    	   for(int i=0;i <prescriptionArrId.length;i++ ) {
		    		   
		    		   sql=" select ifnull(medicine_id,0) from opd_prescription where prescription_id= "+Integer.parseInt(prescriptionArrId[i])+" ";
		    		   SQLQuery q=session.createSQLQuery(sql);
		    		      int medicineId=((Number) q.uniqueResult()).intValue();
		    		   if(medicineId > 0) {
		    		      sql="update opd_prescription set ecogreen_prescription_id ="+maxPrescptionIdCount+" where prescription_id="+Integer.parseInt(prescriptionArrId[i])+"  ";
		    		       session.createSQLQuery(sql).executeUpdate();
		    		   }
		    	   
		    	   }
		    	   
		    	   session.flush();
			       tr.commit();
		    	   
		    	  int res= saleOrderDeatils(maxPrescptionIdCount);
		    	   
		    	   PharmaIndentErrorDTO eObj=new PharmaIndentErrorDTO();
		    	   if(res == 200)
		    	    eObj.setMsg("Order Creation Sucessfull");
		    	   else if(res == 400)
		    		   eObj.setMsg("Order ID is already present....");
		    	   else   
		    		   eObj.setMsg("Something Went Wrong");
		    		   
			    	eObj.setStatus(HttpStatus.OK);
					 // Get the current date
			        LocalDate currentDate = LocalDate.now();
			        // Define the desired date format
			        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			        // Format the current date
			        String currentDate1 = currentDate.format(formatter);
					eObj.setDate(currentDate1);
					 return new ResponseEntity<PharmaIndentErrorDTO>(eObj,HttpStatus.OK);
		    	   
		    	    
		     }catch (Exception e) {
		    	 e.printStackTrace();
		    	 PharmaIndentErrorDTO eObj=new PharmaIndentErrorDTO();
		    	   eObj.setMsg("Something Went Wrong");
			    	eObj.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					 // Get the current date
			        LocalDate currentDate = LocalDate.now();
			        // Define the desired date format
			        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			        // Format the current date
			        String currentDate1 = currentDate.format(formatter);
					eObj.setDate(currentDate1);
					 return new ResponseEntity<PharmaIndentErrorDTO>(eObj,HttpStatus.INTERNAL_SERVER_ERROR);
			}
		
	}
	
	
	public  int  saleOrderDeatils(int indentMasterId) {
   int res=0;
		try {
			  // sessionFactory.getCurrentSession().saveOrUpdate(inventoryMaterialRequestNoteItemInfoSlaveDTO);
			
			 
			 ResourceBundle bundle = ResourceBundle.getBundle("ecogreenapi");
				String SALE_ORDER_URL = bundle.getObject("SALE_ORDER_URL").toString();
				
				PharmaSaleOrderMasterDTO obj=null;
				Session session=sf.openSession();
				Transaction tr=session.beginTransaction();
							 
			// Query querySpMaster =  sessionFactory.getCurrentSession().createSQLQuery("call sp_ecogreen_get_sale_order_prescrption_master_details(:p_indentmasterid)");
			
				 Query querySpMaster =  session.createSQLQuery("call sp_ecogreen_get_sale_order_prescrption_master_details(:p_indentmasterid)");
				querySpMaster.setParameter("p_indentmasterid", indentMasterId);
			  querySpMaster.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderMasterDTO.class));
				@SuppressWarnings("unchecked")
				List<PharmaSaleOrderMasterDTO> lstmaster = querySpMaster.list();
			   res=lstmaster.size() ;
				if(lstmaster.size() > 0) {
					obj=lstmaster.get(0);
					obj.setRemark("prescrption");
					 // Query querySpSlave = sessionFactory.openSession().createSQLQuery("call sp_ecogreen_get_sale_order_prescrption_slave_details(:p_indentmasterid)");
					 
					 Query querySpSlave = session.createSQLQuery("call sp_ecogreen_get_sale_order_prescrption_slave_details(:p_indentmasterid)");
					querySpSlave.setParameter("p_indentmasterid", Integer.parseInt(obj.getOrder_no()));
					  querySpSlave.setResultTransformer(new AliasToBeanResultTransformer(PharmaSaleOrderSlaveDTO.class));
						@SuppressWarnings("unchecked")
						List<PharmaSaleOrderSlaveDTO> lstSlave = querySpSlave.list();
						
				       session.flush();
				       tr.commit();
						
						  obj.setItem(lstSlave);
						
						  ObjectMapper w=new ObjectMapper();
						 String s="";
						 String news="";
						 try {
							 s=w.writeValueAsString(obj);
							 news="payload="+s;
							
						} catch (JsonProcessingException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
                       
						System.out.println("ENtity  ==============="+news);
						 HttpHeaders headers = new HttpHeaders();
						 headers.setContentType(MediaType.APPLICATION_JSON);
						 headers.set("Content-Type", "application/x-www-form-urlencoded");
						 HttpEntity<String> entity = new HttpEntity<String>(news,headers);
						// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
					 ResponseEntity<String> responseEntity = restTemplate.exchange(SALE_ORDER_URL, HttpMethod.POST,entity,String.class);
					   String list = responseEntity.getBody();
					   System.out.println("Response  ==============="+list);
					   
					   @SuppressWarnings("unchecked")
					             Map<String, Object> jsonMap = w.readValue(list, Map.class);
			                	  String StatusCode = (String) jsonMap.get("code");
			        	      System.out.println("StatusCode  ==============="+StatusCode);
					        	  if(Integer.parseInt(StatusCode) == 200 ) {
					        		  PharmaSaleOrderResponseMasterDTO vaobj = w.readValue(list,PharmaSaleOrderResponseMasterDTO.class);
					        		  System.out.println("StatusCode  ==============="+vaobj.getCode());
					        		  res=200;
					        	  }else if(Integer.parseInt(StatusCode) == 400 ) {
					        		  res=400;
					        	  }
					   
					   
				  }
				
			 
		} catch (Exception e) {
			e.printStackTrace();

		}
		return res;
	}
}
