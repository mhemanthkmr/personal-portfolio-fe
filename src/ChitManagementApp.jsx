import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Users, CreditCard, Calendar, DollarSign, Search, Filter } from 'lucide-react';

const ChitManagementApp = () => {
  // Sample data based on your images
  const [chits, setChits] = useState([
    {
      chit_id: 1,
      chit_name: 'RAD-2L-MAR25',
      chit_amount: 200000,
      monthly_amount: 10000,
      total_member: 20,
      total_tenure: 20,
      chit_provider: 'Radha',
      start_date: '2025-03-03',
      commission: 0.02
    },
    {
      chit_id: 2,
      chit_name: 'KAR-3L-APR25',
      chit_amount: 300000,
      monthly_amount: 15000,
      total_member: 20,
      total_tenure: 20,
      chit_provider: 'Karthick',
      start_date: '2025-04-05',
      commission: 0.01
    },
    {
      chit_id: 3,
      chit_name: 'KAR-5L-APR25',
      chit_amount: 500000,
      monthly_amount: 25000,
      total_member: 20,
      total_tenure: 20,
      chit_provider: 'Karthick',
      start_date: '2025-04-10',
      commission: 0.01
    }
  ]);

  const [transactions, setTransactions] = useState([
    { transaction_id: 1, chit_id: 1, month: 1, bid_amount: 204000, payment_date: '2025-03-03', payment_mode: 'Cash', won_in_month: false, notes: 'Agent Chit' },
    { transaction_id: 2, chit_id: 1, month: 2, bid_amount: 164000, payment_date: '2025-04-01', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 3, chit_id: 1, month: 3, bid_amount: 172000, payment_date: '2025-05-01', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 4, chit_id: 1, month: 4, bid_amount: 178000, payment_date: '2025-06-01', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 5, chit_id: 2, month: 1, bid_amount: 303000, payment_date: '2025-04-05', payment_mode: 'Cash', won_in_month: false, notes: 'Agent Chit' },
    { transaction_id: 6, chit_id: 2, month: 2, bid_amount: 228000, payment_date: '2025-05-05', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 7, chit_id: 2, month: 3, bid_amount: 231000, payment_date: '2025-06-05', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 8, chit_id: 3, month: 1, bid_amount: 505000, payment_date: '2025-04-10', payment_mode: 'Cash', won_in_month: false, notes: 'Agent Chit' },
    { transaction_id: 9, chit_id: 3, month: 2, bid_amount: 368000, payment_date: '2025-05-10', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 10, chit_id: 3, month: 3, bid_amount: 373000, payment_date: '2025-06-10', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 11, chit_id: 1, month: 5, bid_amount: 182000, payment_date: '2025-07-01', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 12, chit_id: 2, month: 4, bid_amount: 240000, payment_date: '2025-07-05', payment_mode: 'Cash', won_in_month: false, notes: '' },
    { transaction_id: 13, chit_id: 3, month: 4, bid_amount: 380000, payment_date: '2025-07-10', payment_mode: 'Cash', won_in_month: false, notes: '' }
  ]);

  const [currentView, setCurrentView] = useState('chits');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProvider, setFilterProvider] = useState('');

  // Form states
  const [chitForm, setChitForm] = useState({
    chit_name: '',
    chit_amount: '',
    monthly_amount: '',
    total_member: '',
    total_tenure: '',
    chit_provider: '',
    start_date: '',
    commission: ''
  });

  const [transactionForm, setTransactionForm] = useState({
    chit_id: '',
    month: '',
    bid_amount: '',
    payment_date: '',
    payment_mode: 'Cash',
    won_in_month: false,
    notes: ''
  });

  const resetForms = () => {
    setChitForm({
      chit_name: '',
      chit_amount: '',
      monthly_amount: '',
      total_member: '',
      total_tenure: '',
      chit_provider: '',
      start_date: '',
      commission: ''
    });
    setTransactionForm({
      chit_id: '',
      month: '',
      bid_amount: '',
      payment_date: '',
      payment_mode: 'Cash',
      won_in_month: false,
      notes: ''
    });
  };

  const handleCreateChit = () => {
    const newChit = {
      ...chitForm,
      chit_id: Math.max(...chits.map(c => c.chit_id)) + 1,
      chit_amount: parseFloat(chitForm.chit_amount),
      monthly_amount: parseFloat(chitForm.monthly_amount),
      total_member: parseInt(chitForm.total_member),
      total_tenure: parseInt(chitForm.total_tenure),
      commission: parseFloat(chitForm.commission)
    };
    setChits([...chits, newChit]);
    setShowModal(false);
    resetForms();
  };

  const handleUpdateChit = () => {
    const updatedChits = chits.map(chit => 
      chit.chit_id === selectedItem.chit_id 
        ? { 
            ...chitForm, 
            chit_id: selectedItem.chit_id,
            chit_amount: parseFloat(chitForm.chit_amount),
            monthly_amount: parseFloat(chitForm.monthly_amount),
            total_member: parseInt(chitForm.total_member),
            total_tenure: parseInt(chitForm.total_tenure),
            commission: parseFloat(chitForm.commission)
          }
        : chit
    );
    setChits(updatedChits);
    setShowModal(false);
    resetForms();
  };

  const handleDeleteChit = (chitId) => {
    setChits(chits.filter(chit => chit.chit_id !== chitId));
    setTransactions(transactions.filter(t => t.chit_id !== chitId));
  };

  const handleCreateTransaction = () => {
    const newTransaction = {
      ...transactionForm,
      transaction_id: Math.max(...transactions.map(t => t.transaction_id)) + 1,
      chit_id: parseInt(transactionForm.chit_id),
      month: parseInt(transactionForm.month),
      bid_amount: parseFloat(transactionForm.bid_amount)
    };
    setTransactions([...transactions, newTransaction]);
    setShowModal(false);
    resetForms();
  };

  const handleUpdateTransaction = () => {
    const updatedTransactions = transactions.map(transaction => 
      transaction.transaction_id === selectedItem.transaction_id 
        ? { 
            ...transactionForm, 
            transaction_id: selectedItem.transaction_id,
            chit_id: parseInt(transactionForm.chit_id),
            month: parseInt(transactionForm.month),
            bid_amount: parseFloat(transactionForm.bid_amount)
          }
        : transaction
    );
    setTransactions(updatedTransactions);
    setShowModal(false);
    resetForms();
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions(transactions.filter(t => t.transaction_id !== transactionId));
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    
    if (type === 'edit' && item) {
      if (currentView === 'chits') {
        setChitForm(item);
      } else {
        setTransactionForm(item);
      }
    }
    setShowModal(true);
  };

  const getChitName = (chitId) => {
    const chit = chits.find(c => c.chit_id === chitId);
    return chit ? chit.chit_name : 'Unknown';
  };

  const filteredChits = chits.filter(chit => 
    chit.chit_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterProvider === '' || chit.chit_provider === filterProvider)
  );

  const filteredTransactions = transactions.filter(transaction => 
    getChitName(transaction.chit_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const uniqueProviders = [...new Set(chits.map(c => c.chit_provider))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Chit Management System</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('chits')}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentView === 'chits'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="inline w-4 h-4 mr-2" />
                Chits
              </button>
              <button
                onClick={() => setCurrentView('transactions')}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentView === 'transactions'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CreditCard className="inline w-4 h-4 mr-2" />
                Transactions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {currentView === 'chits' && (
              <select
                value={filterProvider}
                onChange={(e) => setFilterProvider(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Providers</option>
                {uniqueProviders.map(provider => (
                  <option key={provider} value={provider}>{provider}</option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={() => openModal('create')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add {currentView === 'chits' ? 'Chit' : 'Transaction'}
          </button>
        </div>

        {/* Chits Table */}
        {currentView === 'chits' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chit Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredChits.map((chit) => (
                    <tr key={chit.chit_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{chit.chit_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{chit.chit_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{chit.monthly_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chit.total_member}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chit.chit_provider}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{chit.start_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(chit.commission * 100)}%</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('edit', chit)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteChit(chit.chit_id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transactions Table */}
        {currentView === 'transactions' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chit Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bid Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Won</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.transaction_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getChitName(transaction.chit_id)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{transaction.bid_amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.payment_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.payment_mode}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          transaction.won_in_month 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {transaction.won_in_month ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('edit', transaction)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTransaction(transaction.transaction_id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {modalType === 'create' ? 'Add' : 'Edit'} {currentView === 'chits' ? 'Chit' : 'Transaction'}
            </h2>
            
            {currentView === 'chits' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Chit Name"
                  value={chitForm.chit_name}
                  onChange={(e) => setChitForm({...chitForm, chit_name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Chit Amount"
                  value={chitForm.chit_amount}
                  onChange={(e) => setChitForm({...chitForm, chit_amount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Monthly Amount"
                  value={chitForm.monthly_amount}
                  onChange={(e) => setChitForm({...chitForm, monthly_amount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Total Members"
                  value={chitForm.total_member}
                  onChange={(e) => setChitForm({...chitForm, total_member: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Total Tenure"
                  value={chitForm.total_tenure}
                  onChange={(e) => setChitForm({...chitForm, total_tenure: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Chit Provider"
                  value={chitForm.chit_provider}
                  onChange={(e) => setChitForm({...chitForm, chit_provider: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Start Date"
                  value={chitForm.start_date}
                  onChange={(e) => setChitForm({...chitForm, start_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Commission (e.g., 0.02 for 2%)"
                  value={chitForm.commission}
                  onChange={(e) => setChitForm({...chitForm, commission: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <select
                  value={transactionForm.chit_id}
                  onChange={(e) => setTransactionForm({...transactionForm, chit_id: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Chit</option>
                  {chits.map(chit => (
                    <option key={chit.chit_id} value={chit.chit_id}>{chit.chit_name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Month"
                  value={transactionForm.month}
                  onChange={(e) => setTransactionForm({...transactionForm, month: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Bid Amount"
                  value={transactionForm.bid_amount}
                  onChange={(e) => setTransactionForm({...transactionForm, bid_amount: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="date"
                  placeholder="Payment Date"
                  value={transactionForm.payment_date}
                  onChange={(e) => setTransactionForm({...transactionForm, payment_date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={transactionForm.payment_mode}
                  onChange={(e) => setTransactionForm({...transactionForm, payment_mode: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                </select>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="won_in_month"
                    checked={transactionForm.won_in_month}
                    onChange={(e) => setTransactionForm({...transactionForm, won_in_month: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="won_in_month" className="text-sm text-gray-700">Won in this month</label>
                </div>
                <input
                  type="text"
                  placeholder="Notes"
                  value={transactionForm.notes}
                  onChange={(e) => setTransactionForm({...transactionForm, notes: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForms();
                }}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (currentView === 'chits') {
                    modalType === 'create' ? handleCreateChit() : handleUpdateChit();
                  } else {
                    modalType === 'create' ? handleCreateTransaction() : handleUpdateTransaction();
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {modalType === 'create' ? 'Create' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChitManagementApp;