package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.groovy.tools.shell.ParseCode;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.constants.HMSConstants;
import com.hms.dto.Inv_expensebiillDTO;
import com.hms.dto.Inv_expenses_billSlave;
import com.hms.dto.InventoryTaxSetUpDTO;
import com.hms.ehat.dao.InventoryDao;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.Inv_expenseItem;
import com.hms.ehat.dto.OTbilldetaildto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pharmacy.pojo.StockMaster;

import java.sql.Date;
import javax.servlet.http.HttpSession;
import org.hibernate.Session;

import com.hms.canteen.dto.CanteenMaster;

import com.hms.dto.CssdMasterDTO;
import com.hms.dto.CssdSlaveDTO;
import com.hms.dto.InventoryItemMasterDTO;
/*import com.hms.dto.LaundryLinenMasterDTO;
import com.hms.dto.LaundryLinenSlaveDTO;*/
import com.hms.dto.SubInventoryDTO;

@Repository
public class InventoryDaoImpl implements InventoryDao {

	@Autowired
	SessionFactory sessionFactory;

	/********
	 * @author :BILAL
	 * @Date :30-11-2017
	 * @Code :For delete of terms and condition inventory
	 ********/
	@Override
	public boolean deleteinventory(int id, HttpServletRequest request) {
		try {
			Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
					"update inv_termsandcondition_master set inv_termsandCondition_master_delete_flag=1 where inv_termsandCondition_master_id="
							+ id);
			hallType.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/********
	 * @author :BILAL
	 * @Date :30-11-2017
	 * @Code :For delete of ABC analysis inventory
	 ********/
	@Override
	public boolean deleteabc(int id, HttpServletRequest request) {
		try {
			Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
					"update  inv_abcanalysis_details set inv_abcanalysis_delete_flag=1 where idinv_abcanalysis_details="
							+ id);
			hallType.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/********
	 * @author :BILAL
	 * @Date :30-11-2017
	 * @Code :For delete of charges master in inventory
	 ********/
	@Override
	public boolean deletecharges(int id, HttpServletRequest request) {
		try {
			Query hallType = sessionFactory.getCurrentSession()
					.createSQLQuery("update inv_charges_master set inv_status='N' where inv_charges_Id=" + id);
			hallType.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	/********
	 * @author :BILAL
	 * @Date :30-11-2017
	 * @Code :For delete of hospital details in inventory
	 ********/
	@Override
	public boolean deletehospital(int id, HttpServletRequest request) {
		try {
			Query hallType = sessionFactory.getCurrentSession().createSQLQuery(
					"update inv_hospital_details set inv_hospital_delete_flag=1 where idinv_hospital_details=" + id);
			hallType.executeUpdate();

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int fetchhospitalstate(HttpServletRequest request) {

		String id2 = "";
		int id = 0;
		try {
			SQLQuery query13 = sessionFactory.getCurrentSession()
					.createSQLQuery("SELECT hospitalState FROM hospital  ");
			id2 = (String) query13.uniqueResult();
			id = Integer.parseInt(id2);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return id;
	}

	@Override
	public int getexpid(String tablename, HttpServletRequest request) {
		// TODO Auto-generated method stub
		BigInteger id2;
		int id = 0;
		try {

			String sql = "SELECT AUTO_INCREMENT FROM information_schema.tables WHERE table_name = '"
					+ tablename.toString() + "' AND table_schema = '" + HMSConstants.DATABASENAME + "' ";
			SQLQuery query13 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			id2 = (BigInteger) query13.uniqueResult();
			id = id2.intValue();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;

		}
		return id;
	}

	@Override
	public List<Inv_expenses_billSlave> fetchexpenseitem(HttpServletRequest request, String itemname) {
		// TODO Auto-generated method stub
		List<Inv_expenses_billSlave> list = new ArrayList<Inv_expenses_billSlave>();
		try {

			/*
			 * Criteria criteria = sessionFactory.getCurrentSession()
			 * .createCriteria(Inv_expenses_billSlave.class);
			 * criteria.add(Restrictions.eq("inv_expenses_item_delete_flag", 0));
			 * criteria.add(Restrictions.like("inv_expenses_item_Name", itemname + "%")); //
			 * criteria.setProjection(Projections.groupProperty("inv_expenses_item_Name"));
			 */
			String sql = "FROM  Inv_expenses_billSlave S WHERE S.inv_expenses_item_Name  like " + "'%" + itemname
					+ "%' group by S.inv_expenses_item_Name ";
			// SQLQuery query13 =sessionFactory.getCurrentSession().createSQLQuery(sql);
			Query query = sessionFactory.getCurrentSession().createQuery(sql);

			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;

		}
		return list;
	}

	@Override
	public Map<String, String> saveOrUpdateExpenseBill(Inv_expensebiillDTO expensemAster,
			Inv_expensebiillDTO expensemAster1, HttpServletRequest request) {
		Map<String, String> result = new HashMap<String, String>();
		result = new HashMap<String, String>();
		try {

			sessionFactory.getCurrentSession().merge(expensemAster);
			result.put("result", "Record Save Succesfully");

			/* saveBatchStockDetails(patientSaleBillMaster); */

		} catch (Exception e) {
			e.printStackTrace();
		}
		return result;
	}

	@Override
	public List<Inv_expensebiillDTO> fetchexpenseBill(String callform, String value) {
		List<Inv_expensebiillDTO> list = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Inv_expensebiillDTO.class);
			criteria.add(Restrictions.eq("inv_exp_delete_flag", 0));
			criteria.addOrder(Order.desc("inv_exp_no"));
			criteria.setMaxResults(10);
			if (callform.equals("byname")) {
				criteria.add(Restrictions.like("inv_exp_supplier_name", "%" + value + "%"));
			} else if (callform.equals("byid")) {
				Integer inv_exp_no = Integer.parseInt(value);
				criteria.add(Restrictions.eq("inv_exp_no", inv_exp_no));
			}

			list = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return list;
	}

	@Override
	public List<InventoryTaxSetUpDTO> fetchtax(String callform, String value) {
		// TODO Auto-generated method stub
		List<InventoryTaxSetUpDTO> list = new ArrayList<InventoryTaxSetUpDTO>();
		try {
			String sql = "SELECT * FROM " + HMSConstants.DATABASENAME
					+ ".inv_taxsetup_master  where tax_delete_flag !=1 and tax_code like'%" + value + "%'";
			SQLQuery query13 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query13.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list1 = query13.list();

			for (Map<String, Object> rs : list1) {
				InventoryTaxSetUpDTO obj = new InventoryTaxSetUpDTO();
				// String taxid =(String) rs.get("tax_id");
				int tax_id = (Integer) rs.get("tax_id");
				String taxcode = (String) rs.get("tax_code");
				String taxrate = ((Double) rs.get("tax_rate")).toString();
				// String itemAndName_Id = taxcode + "_" + taxrate
				// +"/n"+taxid;
				String itemAndName_Id = taxcode + "_" + taxrate;
				// System.out.println("itenName_Id : " + itenName_Id);
				obj.setTaxId(tax_id);
				obj.setTaxCode(itemAndName_Id);
				list.add(obj);

			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return list;
	}

	@Override
	public String getchallanandpurchaseinvoiceid(String grntid) {
		// TODO Auto-generated method stub
		String id2 = "no";
		int id = 0;
		try {

			String sql = "SELECT MAX(inv_batch_stock_fixchallan),MAX(inv_batch_stock_fixpurchaseinvoice) FROM  inv_batch_stock_master";

			SQLQuery query13 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query13.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list1 = query13.list();
			for (Map<String, Object> rs : list1) {

				// String taxid =(String) rs.get("tax_id");
				Integer challlno = (Integer) rs.get("MAX(inv_batch_stock_fixchallan)");
				Integer invoiceno = (Integer) rs.get("MAX(inv_batch_stock_fixpurchaseinvoice)");
				if (invoiceno != null || challlno != null) {
					id2 = challlno + "@" + invoiceno;
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return id2;

		}
		return id2;
	}

	

	
	

	private void updateSubDeptStockById(int id) {

		String sql = "SELECT send_qty,dept_name,item_code,item_name FROM inv_laundry_slave where  master_mrn_id =" + id
				+ "";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listItems = query.list();
		// List<Map<String, Object>> ltMaitcItems = (List<Map<String, Object>>)
		// getJdbcTemplate().queryForList(sql);
		try {
			for (Map<String, Object> row : listItems) {

				int sendQty = (Integer) (row.get("send_qty"));
				int itemCode = (Integer) (row.get("item_code"));
				String itemName = (String) (row.get("item_name"));
				String deptName = (String) (row.get("dept_name"));

				sql = "select mrn_item_info_slave_id FROM "

						+ "inv_mrn_item_info_slave " + "where inv_mrn_item_info_slave_subinventory = '" + deptName + "'"
						+ " and mrn_item_info_slave_item_code = " + itemCode
						+ " and mrn_item_info_slave_delete_flag != 1 " + " and mrn_status = 'complete' "
						+ "group by mrn_item_info_slave_item_code , mrn_item_info_slave_item_name";

				Query bet = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer mrnItemInfoSlaveId = (Integer) bet.uniqueResult();

				sql = "SELECT mrn_item_info_slave_issue_qty FROM "
						+ " inv_mrn_item_info_slave where mrn_item_info_slave_id=" + mrnItemInfoSlaveId
						+ " and mrn_item_info_slave_delete_flag=0";

				Query bet2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer issQty = (Integer) bet2.uniqueResult();

				issQty = issQty + sendQty;

				sql = "UPDATE " + ".inv_mrn_item_info_slave set mrn_item_info_slave_issue_qty=" + issQty
						+ " where mrn_item_info_slave_id=" + mrnItemInfoSlaveId + "";

				System.err.println(sql);

				SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				query21.executeUpdate();

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	
	@Override
	public int saveOrUpdateCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request) {

		int records = 0;
		int processid = 0;
		try {

			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			processid = cssdMasterDTO.getProcessId();

			cssdMasterDTO.setUnitId(unitId);
			cssdMasterDTO.setDeleted("N");

			Session session = sessionFactory.openSession(); // create session
															// object from the
															// session factory
			session.beginTransaction();
			if (cssdMasterDTO.getProcessId() == 0) {
				cssdMasterDTO.setCreatedBy(userId);
				cssdMasterDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
			} else {
				cssdMasterDTO.setUpdatedBy(userId);
				cssdMasterDTO.setUpdatedDate(new Date(new java.util.Date().getTime()));

			}

			session.merge(cssdMasterDTO);
			if (processid > 0) {
				records = 2;
			} else {
				records = 1;
			}

			/*
			 * boolean r=deductitemsFromSub(laundryLinenMasterDTO); if(r==true) {
			 */
			session.getTransaction().commit();
			session.close();
			// }

			/*
			 * session.getTransaction().commit(); session.close();
			 */

		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}

	@Override
	public List<CssdMasterDTO> getlistCds(String subDept) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("deptName", subDept));

			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistbyIdCsd(int processId) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("processId", processId));
			criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("processId"));
			// criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public int deletebyIdCsd(int id, HttpServletRequest request) {
		int record = 0;
		try {
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			System.err.print("sssssssssssssssssssssssssssssssssssssssssss");
			// updateSubDeptStockById(id);

			CssdMasterDTO obj = (CssdMasterDTO) sessionFactory.getCurrentSession().get(CssdMasterDTO.class, id);
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			record = 1;
		} catch (Exception e) {
			record = 0;
			e.printStackTrace();
		}
		return record;
	}

	@Override
	public List<CssdMasterDTO> getlistbyletterCsd(int letter) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);

			criteria.add(Restrictions.eq("deleted", "N"));
			// criteria.add(Restrictions.like("count", letter + "%"));
			criteria.add(Restrictions.eq("processId", letter));

			/* criteria.add(Restrictions.sqlRestriction(" mrnId LIKE '%"+letter+"%' ")); */

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistForCsdDept() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public int approveReuestCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request) {

		int records = 0;
		int masterid = 0;
		try {

			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			masterid = cssdMasterDTO.getProcessId();

			cssdMasterDTO.setUnitId(unitId);
			cssdMasterDTO.setDeleted("N");

			Session session = sessionFactory.openSession(); // create session
															// object from the
															// session factory
			session.beginTransaction();

			cssdMasterDTO.setCreatedBy(userId);
			cssdMasterDTO.setCreatedDate(new Date(new java.util.Date().getTime()));

			session.merge(cssdMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}

			boolean r = deductitemsFromSubCsd(cssdMasterDTO);
			if (r == true) {
				session.getTransaction().commit();
				session.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}

	public boolean deductitemsFromSubCsd(CssdMasterDTO cssdMasterDTO) {
		System.err.println("SSSSSSSSSaaaaaaaaaaaaaallllllllllmmmmmmmmmaaaaaannnnnnn");
		String sql = "";
		List<Map<String, Object>> ltLaundryBatchDTOs = null;
		List<Map<String, Object>> ltInventoryBatchDTOs = null;
		try {

			List<CssdSlaveDTO> ltBatchStockDTOs = cssdMasterDTO.getLtCssdSlave();

			for (CssdSlaveDTO inventoryBatchStockDTO : ltBatchStockDTOs) {
				/*sql = "SELECT * FROM " + "inv_mrn_item_info_slave" + " where  mrn_item_info_slave_item_name = '"
						+ inventoryBatchStockDTO.getItemName() + "' " + " AND mrn_item_info_slave_delete_flag != 1 "
						+ " AND inv_mrn_item_info_slave_subinventory='" + inventoryBatchStockDTO.getDeptName() + "' "
						+ " AND mrn_status = 'complete' order by mrn_item_info_slave_id";*/
				
				sql = "SELECT * FROM " + "inv_goods_issue_mrn_item_slave_new" + " where  item_name = '"
						+ inventoryBatchStockDTO.getItemName() + "' " + " AND deleted = 'N' "
						+ " AND sub_inventory_name ='" + inventoryBatchStockDTO.getDeptName() + "' "
						+ " AND mrn_status = 'FullyReceived' order by id";
				
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);

				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				ltInventoryBatchDTOs = query.list();

				Integer remainingQTY = 0;
				for (int i = 0; i < ltInventoryBatchDTOs.size(); i++) {
					Map map = new HashMap();
					map = ltInventoryBatchDTOs.get(i);
					int newTableQty = 0;
					Integer tablQTY = (Integer) map.get("current_subinventory_stock");

					if (i == 0) {
						remainingQTY = inventoryBatchStockDTO.getRecievedQty() + inventoryBatchStockDTO.getDiscardQty();
					}
					if (tablQTY >= remainingQTY) {
						newTableQty = tablQTY - remainingQTY;
						sql = "UPDATE " + " inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=" + newTableQty
								+ "" + " where id = " + map.get("id") + " ";

						System.err.println(sql);

						SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql);
						query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						query21.executeUpdate();
						break;
					} else {
						remainingQTY = remainingQTY - tablQTY;
						sql = "update " 
								+ "inv_goods_issue_mrn_item_slave_new SET current_subinventory_stock=0 "
								+ " where id= " + map.get("id") + " ";
					}

				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;

	}

	@Override
	public List<CssdMasterDTO> getIdsForCsdProcessing() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 2));

			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistForProcessing() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 3)); // for getting procsing data

			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistbyletterProcessing(int letter) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);

			criteria.add(Restrictions.eq("deleted", "N"));
			// criteria.add(Restrictions.like("count", letter + "%"));
			criteria.add(Restrictions.eq("mrnStatus", 3));
			criteria.add(Restrictions.eq("processId", letter));

			/* criteria.add(Restrictions.sqlRestriction(" mrnId LIKE '%"+letter+"%' ")); */

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistbyDepNameCsd(String deptName) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deptName", deptName));
			criteria.add(Restrictions.eq("deleted", "N"));
			// criteria.add(Restrictions.eq("mrnStatus", 3) );
			// criteria.add(Restrictions.eq("mrnStatus", 4));

			criteria.add(Restrictions.in("mrnStatus", new Integer[] { 4, 5 }));

			criteria.addOrder(Order.desc("processId"));
			// criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public int acceptItemsCsd(CssdMasterDTO cssdMasterDTO, HttpServletRequest request) {

		int records = 0;
		int masterid = 0;
		try {

			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			masterid = cssdMasterDTO.getProcessId();

			cssdMasterDTO.setUnitId(unitId);
			cssdMasterDTO.setDeleted("N");

			Session session = sessionFactory.openSession(); // create session
															// object from the
															// session factory
			session.beginTransaction();

			cssdMasterDTO.setCreatedBy(userId);
			cssdMasterDTO.setCreatedDate(new Date(new java.util.Date().getTime()));

			session.merge(cssdMasterDTO);
			if (masterid > 0) {
				records = 2;
			} else {
				records = 1;
			}
			boolean r = returnItemsToSubDeptCsd(cssdMasterDTO);
			if (r == true) {
				session.getTransaction().commit();
				session.close();
			}

		} catch (Exception e) {
			e.printStackTrace();
			return records = 0;
		}
		return records;
	}

	private boolean returnItemsToSubDeptCsd(CssdMasterDTO cssdMasterDTO) {
		System.err.println("Aaaaaaaaaaaaaaallllllllllllaaaaaaaaaaammmmmmm");
		String sql = "";
		List<Map<String, Object>> ltLaundryBatchDTOs = null;
		List<Map<String, Object>> ltInventoryBatchDTOs = null;
		try {

			List<CssdSlaveDTO> ltBatchStockDTOs = cssdMasterDTO.getLtCssdSlave();

			for (CssdSlaveDTO inventoryBatchStockDTO : ltBatchStockDTOs) {

				sql = "select id FROM "

						+ "inv_goods_issue_mrn_item_slave_new " + "where sub_inventory_name = '"
						+ inventoryBatchStockDTO.getDeptName() + "'" + " and item_master_id = "
						+ inventoryBatchStockDTO.getItemCode() + " and deleted = 'N' "
						+ " and mrn_status = 'FullyReceived' "
						+ "group by item_master_id , item_name";

				Query bet = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer mrnItemInfoSlaveId = (Integer) bet.uniqueResult();

				sql = "SELECT sum(current_subinventory_stock) FROM "
						+ " inv_goods_issue_mrn_item_slave_new where id=" + mrnItemInfoSlaveId
						+ " and deleted = 'N'";

				Query bet2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				Integer issQty = (Integer) bet2.uniqueResult();

				issQty = issQty + inventoryBatchStockDTO.getRecievedQty();

				sql = "UPDATE " + "inv_goods_issue_mrn_item_slave_new set current_subinventory_stock=" + issQty
						+ " where id=" + mrnItemInfoSlaveId + "";

				System.err.println(sql);

				SQLQuery query21 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query21.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				query21.executeUpdate();

			}

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

		return true;

	}

	@Override
	public List<CssdMasterDTO> getlistForApprovedItemsCsd(String subDept) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 2));
			criteria.add(Restrictions.eq("deptName", subDept));
			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistbyletterCsdForReturnItems(int letter) {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);

			criteria.add(Restrictions.eq("deleted", "N"));
			// criteria.add(Restrictions.like("count", letter + "%"));
			criteria.add(Restrictions.eq("processId", letter));
			// criteria.add(Restrictions.eq("mrnStatus", 5));
			criteria.add(Restrictions.in("mrnStatus", new Integer[] { 4, 5 }));

			/* criteria.add(Restrictions.sqlRestriction(" mrnId LIKE '%"+letter+"%' ")); */

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	
	@Override
	public List<CssdMasterDTO> getlistForRequestedDashboardCsd() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 1));
			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistForProcessingDashboardCsd() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.in("mrnStatus", new Integer[] { 2, 3 }));
			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistForDispachedDashboardCsd() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 4));
			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getlistForCompletedDashboardCsd() {
		List<CssdMasterDTO> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CssdMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("mrnStatus", 5));
			criteria.addOrder(Order.desc("processId"));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@SuppressWarnings("null")
	@Override
	public List<InventoryItemMasterDTO> fetchItemNamesOnlyAutoSuggestForLaundryItems(String letter) {
		List<InventoryItemMasterDTO> ltmaster = new ArrayList<InventoryItemMasterDTO>();
		String sql;
		try {

			sql = "SELECT * FROM "
					+ " inv_item_master  where item_master_delete_flag=0 AND status !=1 and is_lnl='Y' and item_name like'%"
					+ letter + "%'";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listItems = query.list();

			for (Map<String, Object> row : listItems) {
				InventoryItemMasterDTO inventoryDTO = new InventoryItemMasterDTO();
				/*
				 * inventoryDTO.setMachine_maintainance_id((Integer)(row.get(
				 * "machine_maintainance_id")));
				 * inventoryDTO.setMachine_maintainance_item_id((Integer)(row.get(
				 * "machine_maintainance_item_id")));
				 * inventoryDTO.setItem_name((String)(row.get("item_name")));
				 * inventoryDTO.setMaintainance_date((java.sql.Date)(row.get("maintainance_date"
				 * ))); ltDTO.add(machineDTO);
				 */

				inventoryDTO.setItem_id((Integer) (row.get("item_id")));
				inventoryDTO.setItem_name((String) (row.get("item_name")));
				inventoryDTO.setItem_type((String) (row.get("item_type")));
				inventoryDTO.setItem_group((String) (row.get("item_group")));

				inventoryDTO.setMfg_by_name((String) (row.get("mfg_by_name")));
				inventoryDTO.setStatus((String) (row.get("status")));
				// dto.setShort_code( rs.getString( 7 ) );
				inventoryDTO.setLead_time((String) (row.get("lead_time")));
				inventoryDTO.setMax_stock((Integer) (row.get("max_stock")));

				inventoryDTO.setMin_stock((Integer) (row.get("min_stock")));
				inventoryDTO.setOrder_stock((Integer) (row.get("order_stock")));
				inventoryDTO.setItem_category((String) (row.get("item_category")));
				inventoryDTO.setItem_alias_name((String) (row.get("item_alias_name")));
				// dto.setItem_type( rs.getString( 14 ) );

				// dto.setItem_expire_validity( rs.getDate(14 ) );
//					dto.setItem_other_info( rs.getString( 15 ) );
				inventoryDTO.setItem_remark((String) (row.get("item_remark")));
				inventoryDTO.setItem_master_delete_flag((Integer) (row.get("item_master_delete_flag")));

				inventoryDTO.setItem_master_update((String) (row.get("item_master_update")));
				inventoryDTO.setItem_sale_item((Integer) (row.get("item_sale_item")));
				inventoryDTO.setItem_Phantam_item((Integer) (row.get("item_Phantam_item")));
				inventoryDTO.setItem_purchase_item((Integer) (row.get("item_purchase_item")));

				inventoryDTO.setItem_other_item((Integer) (row.get("item_other_item")));
				inventoryDTO.setItem_inventory_item((Integer) (row.get("item_inventory_item")));
				inventoryDTO.setItem_assest_item((Integer) (row.get("item_assest_item")));
				inventoryDTO.setInv_item_taxcode_and_rate((String) (row.get("inv_item_taxcode_and_rate")));
				ltmaster.add(inventoryDTO);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getCssdReport(String startDate, String endDate) {
		List<CssdMasterDTO> ltmaster = new ArrayList<CssdMasterDTO>();
		;
		try {
			System.err.println("AAAAAAlLLLLLLLLAAAAAAAM" + startDate);
			System.err.println("AAAAAAlLLLLLLLLAAAAAAAM" + endDate);

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date date = sdf.parse(startDate);
			java.util.Date date2 = sdf.parse(endDate);
			java.sql.Date sqlsDate = new Date(date.getTime());
			java.sql.Date sqleDate = new Date(date2.getTime());

			System.err.println("AAAAAAlLLLLLLLLAAAAAAAM" + sqlsDate);
			System.err.println("AKMALLLLLLLL" + sqleDate);

			Session session = sessionFactory.getCurrentSession();
			String hql = ("from CssdMasterDTO WHERE DATE_FORMAT(createdDate, '%Y-%m-%d') BETWEEN :stDate AND :edDate order by processId desc");
			Query query = session.createQuery(hql);
			query.setDate("stDate", sqlsDate);
			query.setDate("edDate", sqleDate);

			ltmaster = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public List<CssdMasterDTO> getCssdReport2(String startDate, String endDate, String subDept) {
		List<CssdMasterDTO> ltmaster = new ArrayList<CssdMasterDTO>();
		try {

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date date = sdf.parse(startDate);
			java.util.Date date2 = sdf.parse(endDate);
			java.sql.Date sqlsDate = new Date(date.getTime());
			java.sql.Date sqleDate = new Date(date2.getTime());
			System.err.println("AAAAAAkkkkkMMMaaaaaaaaLLLL" + subDept);
			Session session = sessionFactory.getCurrentSession();
			String hql = ("from CssdMasterDTO WHERE DATE_FORMAT(createdDate, '%Y-%m-%d') BETWEEN :stDate AND :edDate AND deptName=:deptName order by processId desc");
			Query query = session.createQuery(hql);
			query.setDate("stDate", sqlsDate);
			query.setDate("edDate", sqleDate);
			query.setParameter("deptName", subDept);

			ltmaster = query.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;

	}

	@Override
	public SubInventoryDTO getSubInventory() {

		List<SubInventoryDTO> list = new ArrayList<SubInventoryDTO>();
		SubInventoryDTO obj3 = new SubInventoryDTO();
		try {

			String sql1 = "SELECT * FROM inv_subinventory_master where status!='N' order by subinventory_id desc";
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> data1 = query1.list();

			for (Map<String, Object> row : data1) {
				SubInventoryDTO obj2 = new SubInventoryDTO();
				obj2.setSubinventory_Id((Integer) row.get("subinventory_Id"));
				obj2.setSubinventory_name((String) row.get("subinventory_name"));
				list.add(obj2);
			}
			obj3.setLtSubInventoryDTO(list);

		} catch (Exception e) {
			e.printStackTrace();
			return obj3;
		}
		return obj3;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ItemMasterDto> fetchItemNamesAutoSuggestForCsdItems(String parameter) {
		List<ItemMasterDto> ltItemeDTOs = null;

		try {
		
			String sql = "SELECT id, item_name as itemName FROM "
					+ "inv_item_master_new  where deleted='N' AND css_item_status = '1' and item_name like'%"
					+ parameter + "%'";

			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Transformers.aliasToBean(ItemMasterDto.class));
			ltItemeDTOs = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltItemeDTOs;
	}
	
	/********
	 * @author     :Vishant
	 * @Date       :15-09-23
	 * @Code       :For auto complete 
	 * **********/
	@Override
	public List<ItemMasterDto> getMatchine(String txtVal) {
		List<ItemMasterDto> lstItemMaster = new ArrayList<ItemMasterDto>();
		try{
			//Session session = sessionFactory.getCurrentSession();
			/*String sql="select * from inv_item_master_new where isLnL='MI'";
			Query recQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			System.out.println(".......sql........"+sql);
			recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listRec = recQuery.list();
			for (Map<String, Object> row : listRec) {

				ItemMasterDto objMaster = new ItemMasterDto();
				// objMaster.setBillNo(((BigInteger)row.get("rec_id")).intValue());
				

				objMaster.setItemName((String) row.get("item_name"));

				// objMaster.setBillId((Integer)row.get("bill_id"));
				
				lstItemMaster.add(objMaster);
				objMaster = null;
			}*/
			
			Session session = sessionFactory.getCurrentSession();
		//	String hql="from ItemMasterDto where deleted='N' and isLnL='MI' and item_name like'%" + txtVal + "%'";
			String hql="from ItemMasterDto where deleted='N' and isLnL='MI'";
			Query query = session.createQuery(hql);
			 
			lstItemMaster=query.list();
			
		}catch (Exception e) {
			e.printStackTrace();
			return lstItemMaster;
		}
		
		return lstItemMaster;
	}

	
}
