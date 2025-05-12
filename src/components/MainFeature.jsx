import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ activeTab }) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  
  const User = getIcon('User');
  const ArrowRight = getIcon('ArrowRight');
  const QrCode = getIcon('QrCode');
  const CreditCard = getIcon('CreditCard');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`${activeTab === 'request' ? 'Request sent' : 'Payment sent'} to ${recipient}: $${amount}`);
    setAmount('');
    setRecipient('');
  };
  
  const [cardSelected, setCardSelected] = useState(null);
  
  // Examples of payment cards
  const paymentCards = [
    { id: 1, name: 'PayWave Visa', last4: '4567', type: 'visa', color: 'from-blue-500 to-indigo-500' },
    { id: 2, name: 'PayWave Mastercard', last4: '8901', type: 'mastercard', color: 'from-red-500 to-orange-500' },
    { id: 3, name: 'PayWave Debit', last4: '2345', type: 'debit', color: 'from-emerald-500 to-green-500' },
  ];
  
  // Content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'send':
      case 'request':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium mb-2">
                {activeTab === 'send' ? 'Send Money To' : 'Request Money From'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-surface-400" />
                </div>
                <input
                  type="text"
                  id="recipient"
                  className="input-field !pl-10"
                  placeholder="Name, email, or phone"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2">
                Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-surface-400">$</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  className="input-field !pl-10"
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={!amount || !recipient}
            >
              <span>{activeTab === 'send' ? 'Send Money' : 'Request Money'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        );
        
      case 'scan':
        return (
          <div className="text-center space-y-6">
            {showQRCode ? (
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg inline-block mb-4">
                  <QrCode className="w-48 h-48 text-surface-800" />
                </div>
                <button
                  onClick={() => setShowQRCode(false)}
                  className="btn btn-outline"
                >
                  Hide QR Code
                </button>
              </div>
            ) : (
              <>
                <p className="text-surface-600 dark:text-surface-400">
                  Scan a QR code to send or receive money quickly and securely.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => toast.info("Camera access requires device permission")}
                    className="btn btn-primary w-full"
                  >
                    Scan Code
                  </button>
                  <button
                    onClick={() => setShowQRCode(true)}
                    className="btn btn-outline w-full"
                  >
                    My QR Code
                  </button>
                </div>
              </>
            )}
          </div>
        );
        
      case 'cards':
        return (
          <div className="space-y-4">
            <p className="text-surface-600 dark:text-surface-400 mb-4">
              Select a card to view details or make a payment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setCardSelected(card)}
                  className={`relative h-44 rounded-xl overflow-hidden cursor-pointer transition-all ${
                    cardSelected?.id === card.id ? 'ring-2 ring-primary scale-[1.02]' : 'hover:scale-[1.02]'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`}></div>
                  <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="text-lg font-bold">{card.name}</div>
                      <CreditCard className="w-8 h-8 opacity-80" />
                    </div>
                    
                    <div>
                      <div className="mb-1 opacity-80 text-sm">Card Number</div>
                      <div className="flex items-center space-x-2 text-lg">
                        <span>••••</span>
                        <span>••••</span>
                        <span>••••</span>
                        <span>{card.last4}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div className="text-sm opacity-80">PayWave</div>
                      <div className="uppercase font-bold text-sm">{card.type}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <button 
                onClick={() => toast.info("Add new card feature coming soon!")}
                className="btn btn-outline"
              >
                Add New Card
              </button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p>Feature coming soon!</p>
          </div>
        );
    }
  };
  
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      {renderTabContent()}
    </motion.div>
  );
};

export default MainFeature;