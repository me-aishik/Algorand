import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Trophy, QrCode, Calendar, User, Hash, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';

interface NFTCard {
  id: number;
  eventName: string;
  date: string;
  organizer: string;
  hash: string;
  rarity: 'common' | 'rare' | 'legendary';
}

const AttendeeDashboard: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  // Mock NFT collection data
  const nftCollection: NFTCard[] = [
    {
      id: 1,
      eventName: "Algorand Developer Summit 2024",
      date: "2024-03-15",
      organizer: "Algorand Foundation",
      hash: "QmX7Yh3K9p2mNxR4F8qW5tL9bH6vJ2nM8cZ1xQ3wE7rT5uI",
      rarity: 'legendary'
    },
    {
      id: 2,
      eventName: "Blockchain Workshop Series",
      date: "2024-02-28",
      organizer: "Tech University",
      hash: "QmB8Kp4L2nR7mS9xT6vU3wY1zA5qH8jF9dG7eC4iN0oP2mK",
      rarity: 'rare'
    },
    {
      id: 3,
      eventName: "DeFi Meetup Miami",
      date: "2024-01-20",
      organizer: "DeFi Community",
      hash: "QmF3Rt8uY9vL2nK4jH7mS6wP1qX5eZ9bG8cI0dR3tY7uL2n",
      rarity: 'common'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      default: return 'from-cyan-400 to-blue-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-yellow-500/30';
      case 'rare': return 'shadow-purple-500/30';
      default: return 'shadow-cyan-500/30';
    }
  };

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % nftCollection.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + nftCollection.length) % nftCollection.length);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Attendee Dashboard
      </motion.h1>

      {!walletConnected ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <GlassCard className="max-w-md mx-auto">
            <div className="text-center space-y-6">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ 
                  rotate: 360,
                  boxShadow: [
                    '0 0 30px rgba(34, 211, 238, 0.3)',
                    '0 0 50px rgba(168, 85, 247, 0.3)',
                    '0 0 30px rgba(34, 211, 238, 0.3)'
                  ]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  boxShadow: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
              >
                <Wallet className="w-12 h-12 text-white" />
              </motion.div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Connect Your Wallet</h2>
                <p className="text-gray-400">Connect your Algorand wallet to view your POAP collection</p>
              </div>
              
              <GlowingButton
                icon={Wallet}
                gradient="from-cyan-500 to-purple-500"
                onClick={() => setWalletConnected(true)}
                className="w-full"
              >
                Connect Algorand Wallet
              </GlowingButton>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {/* Gamification Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <GlassCard className="max-w-md mx-auto">
              <div className="flex items-center justify-center gap-4">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Trophy className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">POAP Collector</h3>
                  <p className="text-cyan-400 font-semibold">You've collected {nftCollection.length} POAP NFTs 🚀</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < 3 ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* NFT Collection Display */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Your POAP Collection</h2>
            
            {/* Carousel */}
            <div className="relative max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCardIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <NFTCollectionCard nft={nftCollection[currentCardIndex]} />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <motion.button
                onClick={prevCard}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                onClick={nextCard}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Dots Indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {nftCollection.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentCardIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentCardIndex ? 'bg-cyan-400' : 'bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4"
          >
            <GlowingButton
              icon={QrCode}
              gradient="from-green-500 to-teal-500"
              className="px-6 py-3"
            >
              QR Scanner
            </GlowingButton>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// NFT Collection Card Component
const NFTCollectionCard: React.FC<{ nft: NFTCard }> = ({ nft }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      default: return 'from-cyan-400 to-blue-500';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'shadow-yellow-500/30';
      case 'rare': return 'shadow-purple-500/30';
      default: return 'shadow-cyan-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      className={`relative p-6 rounded-2xl bg-gradient-to-r ${getRarityColor(nft.rarity)} shadow-2xl ${getRarityGlow(nft.rarity)}`}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      style={{ perspective: 1000 }}
    >
      {/* Holographic Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-30"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.1), transparent)',
          backgroundSize: '300% 300%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 text-white">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-1">{nft.eventName}</h3>
            <p className="text-white/80 uppercase text-xs font-semibold tracking-wide">
              {nft.rarity} • POAP NFT
            </p>
          </div>
          <motion.div
            className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <QrCode className="w-8 h-8" />
          </motion.div>
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            <span>{formatDate(nft.date)}</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5" />
            <span>{nft.organizer}</span>
          </div>
        </div>

        {/* Hash with Glitch Effect */}
        <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Hash className="w-4 h-4" />
            <span className="text-xs text-white/70">Certificate Hash</span>
          </div>
          <motion.p 
            className="font-mono text-xs break-all"
            animate={{ 
              textShadow: [
                '0 0 5px rgba(255,255,255,0.5)',
                '2px 0 5px rgba(255,255,255,0.8)',
                '-2px 0 5px rgba(255,255,255,0.8)',
                '0 0 5px rgba(255,255,255,0.5)'
              ]
            }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            {nft.hash}
          </motion.p>
        </div>

        {/* Verified Badge */}
        <motion.div
          className="absolute top-4 right-4 bg-green-500 rounded-full p-2"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-2 h-2 bg-white rounded-full"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AttendeeDashboard;