import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ activeTab }) => {
  // Common icons
  const SendIcon = getIcon('SendHorizonal');
  const UserIcon = getIcon('User');
  const PhoneIcon = getIcon('Phone');
  const DollarIcon = getIcon('DollarSign');
  const SearchIcon = getIcon('Search');
  const QrCodeIcon = getIcon('QrCode');
  const CameraIcon = getIcon('Camera');
  const CreditCardIcon = getIcon('CreditCard');
  const PlusIcon = getIcon('Plus');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  // States for Send Money tab
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Recent contacts data
  const [contacts] = useState([
    { id: 1, name: 'Sarah Johnson', phone: '+1 (555) 123-4567', avatar: 'https://source.unsplash.com/100x100/?portrait,woman,1', recent: true },
    { id: 2, name: 'Michael Roberts', phone: '+1 (555) 234-5678', avatar: 'https://source.unsplash.com/100x100/?portrait,man,1', recent: true },
    { id: 3, name: 'Emma Williams', phone: '+1 (555) 345-6789', avatar: 'https://source.unsplash.com/100x100/?portrait,woman,2', recent: false },
    { id: 4, name: 'James Brown', phone: '+1 (555) 456-7890', avatar: 'https://source.unsplash.com/100x100/?portrait,man,2', recent: true },
    { id: 5, name: 'Olivia Davis', phone: '+1 (555) 567-8901', avatar: 'https://source.unsplash.com/100x100/?portrait,woman,3', recent: false },
    { id: 6, name: 'William Miller', phone: '+1 (555) 678-9012', avatar: 'https://source.unsplash.com/100x100/?portrait,man,3', recent: false }
  ]);
  
  // Cards data for Cards tab
  const [cards] = useState([
    { id: 1, type: 'visa', last4: '4589', expiry: '05/25', bank: 'Chase Bank', color: 'from-indigo-500 to-purple-500' },
    { id: 2, type: 'mastercard', last4: '3456', expiry: '11/26', bank: 'Bank of America', color: 'from-pink-500 to-rose-500' },
    { id: 3, type: 'discover', last4: '7890', expiry: '08/24', bank: 'Discover', color: 'from-amber-500 to-orange-500' }
  ]);
  
  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );
  
  // Handle send money form submission
  const handleSendMoney = (e) => {
    e.preventDefault();
    
    // Validation
    if (!recipient) {
      toast.error("Please select a recipient");
      return;
    }
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Show confirmation
    setShowConfirmation(true);
  };
  
  // Handle confirmation
  const handleConfirmSend = () => {
    const selectedContact = contacts.find(c => c.id === parseInt(recipient));
    
    toast.success(`$${parseFloat(amount).toFixed(2)} sent to ${selectedContact?.name}!`);
    
    // Reset form
    setRecipient('');
    setAmount('');
    setNote('');
    setShowConfirmation(false);
  };
  
  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 }
    }
  };
  
  // Handle contact selection
  const handleContactSelect = (contactId) => {
    setRecipient(contactId.toString());
  };

  return (
    <div className="min-h-[350px] relative">
      <AnimatePresence mode="wait">
        {/* Send Money Tab */}
        {activeTab === 'send' && (
          <motion.div
            key="send"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            {!showConfirmation ? (
              <form onSubmit={handleSendMoney}>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <SendIcon className="w-5 h-5 mr-2 text-primary" />
                  Send Money
                </h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    To
                  </label>
                  
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="Search contacts"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="overflow-x-auto scrollbar-hide -mx-2 px-2 pb-2">
                    <div className="flex space-x-3 mb-3">
                      {contacts.filter(c => c.recent).map(contact => (
                        <div 
                          key={contact.id}
                          onClick={() => handleContactSelect(contact.id)}
                          className={`flex flex-col items-center cursor-pointer p-2 rounded-xl transition-all ${
                            recipient === contact.id.toString() 
                              ? 'bg-primary/10 ring-2 ring-primary' 
                              : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                          }`}
                        >
                          <div className="w-16 h-16 rounded-full overflow-hidden mb-2 relative">
                            <img 
                              src={contact.avatar} 
                              alt={contact.name}
                              className="w-full h-full object-cover"
                            />
                            {recipient === contact.id.toString() && (
                              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                {getIcon('Check')({ className: "w-8 h-8 text-white" })}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-center">{contact.name.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="max-h-40 overflow-y-auto pr-1 space-y-2 mt-4">
                    {filteredContacts.length > 0 ? (
                      filteredContacts.map(contact => (
                        <div 
                          key={contact.id}
                          onClick={() => handleContactSelect(contact.id)}
                          className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                            recipient === contact.id.toString() 
                              ? 'bg-primary/10 ring-2 ring-primary' 
                              : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img 
                              src={contact.avatar} 
                              alt={contact.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-surface-500 dark:text-surface-400">{contact.phone}</p>
                          </div>
                          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center">
                            {recipient === contact.id.toString() && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-4 text-surface-500 dark:text-surface-400">
                        No contacts found
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarIcon className="h-5 w-5 text-surface-400" />
                    </div>
                    <input
                      type="text"
                      className="input-field pl-10"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Note (optional)
                  </label>
                  <textarea
                    className="input-field resize-none"
                    placeholder="Add a note..."
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${!recipient || !amount ? 'opacity-70 cursor-not-allowed' : ''}`}
                  disabled={!recipient || !amount}
                >
                  Continue
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <SendIcon className="w-10 h-10 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-1">Confirm Payment</h3>
                
                {recipient && (
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <img 
                        src={contacts.find(c => c.id === parseInt(recipient))?.avatar} 
                        alt="Recipient"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{contacts.find(c => c.id === parseInt(recipient))?.name}</p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {contacts.find(c => c.id === parseInt(recipient))?.phone}
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="card bg-surface-50 dark:bg-surface-800 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-surface-500 dark:text-surface-400">Amount</span>
                    <span className="font-medium">${parseFloat(amount).toFixed(2)}</span>
                  </div>
                  {note && (
                    <div className="flex justify-between">
                      <span className="text-surface-500 dark:text-surface-400">Note</span>
                      <span className="font-medium">{note}</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    className="btn btn-outline"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmSend}
                    className="btn btn-primary"
                  >
                    Send Money
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
        
        {/* Request Money Tab */}
        {activeTab === 'request' && (
          <motion.div
            key="request"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              {getIcon('Download')({ className: "w-5 h-5 mr-2 text-primary" })}
              Request Money
            </h3>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              toast.info("Request money feature coming soon!");
            }}>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  From
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="Contact name or phone number"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarIcon className="h-5 w-5 text-surface-400" />
                  </div>
                  <input
                    type="text"
                    className="input-field pl-10"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Note (optional)
                </label>
                <textarea
                  className="input-field resize-none"
                  placeholder="Add a note..."
                  rows="3"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                Request Money
              </button>
            </form>
          </motion.div>
        )}
        
        {/* Scan QR Tab */}
        {activeTab === 'scan' && (
          <motion.div
            key="scan"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <QrCodeIcon className="w-5 h-5 mr-2 text-primary" />
              Scan QR Code
            </h3>
            
            <div className="text-center">
              <div className="bg-surface-100 dark:bg-surface-800 p-4 rounded-xl mb-6 aspect-square max-w-xs mx-auto relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <CameraIcon className="w-24 h-24 text-surface-400" />
                </div>
                <div className="absolute inset-0 border-2 border-dashed border-primary/60 rounded-xl"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
              </div>
              
              <button
                onClick={() => toast.info("Camera access required for scanning QR codes")}
                className="btn btn-primary mx-auto"
              >
                <CameraIcon className="w-5 h-5 mr-2" />
                Access Camera
              </button>
              
              <div className="mt-6 p-4 bg-surface-100 dark:bg-surface-800 rounded-xl">
                <h4 className="font-medium mb-2">Or generate your QR code</h4>
                <p className="text-sm text-surface-500 dark:text-surface-400 mb-4">
                  Let others scan your QR code to pay you quickly
                </p>
                <button
                  onClick={() => toast.info("Generate QR code feature coming soon!")}
                  className="btn btn-outline w-full"
                >
                  Generate Your QR
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Cards Tab */}
        {activeTab === 'cards' && (
          <motion.div
            key="cards"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="card"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2 text-primary" />
              Your Cards
            </h3>
            
            <div className="space-y-4 mb-6">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`p-5 rounded-xl bg-gradient-to-r ${card.color} text-white relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow`}
                  onClick={() => toast.info(`${card.bank} card details`)}
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/4 -translate-y-1/2"></div>
                  
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <p className="text-white/70 text-sm">Balance</p>
                      <p className="text-xl font-bold">$2,345.75</p>
                    </div>
                    <div className="uppercase font-bold tracking-wider">
                      {card.type}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-xs">Card Number</p>
                      <p className="font-medium">•••• •••• •••• {card.last4}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/70 text-xs">Expires</p>
                      <p className="font-medium">{card.expiry}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={() => toast.info("Add new card feature coming soon!")}
              className="flex items-center justify-center w-full p-4 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-xl text-surface-500 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors cursor-pointer"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>Add New Card</span>
            </button>
            
            <div className="mt-6">
              <button
                onClick={() => toast.info("Virtual card feature coming soon!")}
                className="flex items-center justify-between w-full p-4 text-primary bg-primary/5 rounded-xl"
              >
                <div className="flex items-center">
                  {getIcon('CreditCard')({ className: "w-5 h-5 mr-3" })}
                  <span>Get a virtual card</span>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;