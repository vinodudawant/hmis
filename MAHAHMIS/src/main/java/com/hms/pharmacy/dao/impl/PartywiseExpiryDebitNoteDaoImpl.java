package com.hms.pharmacy.dao.impl;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pharmacy.dao.PartywiseExpiryDebitNoteDao;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.PartywiseExpiryDebitNoteMaster;
import com.hms.pharmacy.pojo.PartywiseExpiryDebitNoteSlave;
import com.hms.pharmacy.pojo.StockMaster;

@Repository
public class PartywiseExpiryDebitNoteDaoImpl implements PartywiseExpiryDebitNoteDao 
{
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public boolean saveOrUpdateDebitNote(PartywiseExpiryDebitNoteMaster debitNoteMaster) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(debitNoteMaster);
			saveBatchStockDetails(debitNoteMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;

	}

	public void saveBatchStockDetails(PartywiseExpiryDebitNoteMaster partywiseExpiryDebitNoteMaster) {
		List<BatchMaster> batchMasters = new ArrayList<BatchMaster>();
		for (PartywiseExpiryDebitNoteSlave slave : partywiseExpiryDebitNoteMaster.getDebitNoteSlaves()) {
			BatchMaster batchMaster = new BatchMaster();
			batchMaster.setBatchId(slave.getProductMaster().getBatchMaster()
					.get(0).getBatchId());

			StockMaster stockMaster = new StockMaster();
			stockMaster.setStockId(slave.getProductMaster().getBatchMaster()
					.get(0).getStockMaster().getStockId());

			Double qty = (slave.getProductMaster().getBatchMaster().get(0)
					.getStockMaster().getStockQtyInHand() - slave
					.getDebitNoteSlaveQty());

			stockMaster.setStockQtyInHand(qty);
			batchMaster.setStockMaster(stockMaster);
			batchMasters.add(batchMaster);
		}
		try {
			for (BatchMaster batchMaster : batchMasters) {
				BatchMaster batchMaster2 = getBatchDetails(batchMaster.getBatchId());
				StockMaster stockMaster =batchMaster2.getStockMaster();
				stockMaster.setStockQtyInHand(batchMaster.getStockMaster().getStockQtyInHand());
				batchMaster2.setStockMaster(stockMaster);
				sessionFactory.getCurrentSession().saveOrUpdate(batchMaster2);
			}
		} catch (Exception e) {
			e.printStackTrace();

		}
	}

	@Override
	public List<PartywiseExpiryDebitNoteMaster> getDebitNoteList() {
		List<PartywiseExpiryDebitNoteMaster> debitNoteMasters = null;
		try {

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartywiseExpiryDebitNoteMaster.class);
			criteria.add(Restrictions.eq("debitNoteDeleteFlag", 0));
			debitNoteMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return debitNoteMasters;
		}
		return debitNoteMasters;
	}

	@Override
	public List<PartywiseExpiryDebitNoteMaster> getDebitNotebyVendorId(Integer vendorId) {
		List<PartywiseExpiryDebitNoteMaster> debitNoteMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartywiseExpiryDebitNoteMaster.class);
			criteria.add(Restrictions.eq("debitNoteDeleteFlag", 0));
			if (vendorId != 0) {
				criteria.add(Restrictions.eq("vendorMaster.vendorId", vendorId));
			}
			debitNoteMasters = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return debitNoteMasters;
		}
		return debitNoteMasters;
	}

	@Override
	public PartywiseExpiryDebitNoteMaster getDebitNotebyDebitId(Integer debitNoteId) {
		PartywiseExpiryDebitNoteMaster debitNoteMasters = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartywiseExpiryDebitNoteMaster.class);
			criteria.add(Restrictions.eq("debitNoteDeleteFlag", 0));
			if (debitNoteId != 0) {
				criteria.add(Restrictions.eq("debitNoteId", debitNoteId));
			}
			debitNoteMasters = (PartywiseExpiryDebitNoteMaster) criteria.uniqueResult();

		} catch (Exception e) {
			e.printStackTrace();
			return debitNoteMasters;
		}
		return debitNoteMasters;
	}

	public BatchMaster getBatchDetails(Integer batchId) {
		BatchMaster batchMaster = null;
		try {
			batchMaster = (BatchMaster) sessionFactory.getCurrentSession().get(
					BatchMaster.class, batchId);

		} catch (Exception e) {
			e.printStackTrace();

		}
		return batchMaster;
	}

	@Override
	public boolean deleteDebitNote(Integer debitNoteId) {
		try {
			PartywiseExpiryDebitNoteMaster debitNoteMaster = (PartywiseExpiryDebitNoteMaster) sessionFactory
					.getCurrentSession()
					.get(PartywiseExpiryDebitNoteMaster.class, debitNoteId);
			debitNoteMaster.setDebitNoteDeleteFlag(1);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
}
