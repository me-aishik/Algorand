import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, QrCode, Calendar, User, Hash, ChevronLeft, ChevronRight, Wallet } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowingButton from '../components/GlowingButton';
import { useWallet } from '../components/wallet/WalletContext';

interface NFTCard {
  id: number;
  eventName: string;
  date: string;
  organizer: string;
  hash: string;
  rarity: 'common' | 'rare' | 'legendary';
}

const NFTCollectionCard = ({ nft }: { nft: NFTCard }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'rare': return 'from-purple-400 to-pink-500';
      default: return 'from-cyan-400 to-blue-500';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '🌟 Legendary';
      case 'rare': return '✨ Rare';
      default: return '🔷 Common';
    }
  };

  return (
    <GlassCard className="max-w-2xl mx-auto overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <motion.div
              className={`aspect-square rounded-xl bg-gradient-to-br ${getRarityColor(nft.rarity)} p-1`}
              animate={{
                boxShadow: [
                  '0 0 20px rgba(234, 179, 8, 0)',
                  '0 0 30px rgba(234, 179, 8, 0.3)',
                  '0 0 20px rgba(234, 179, 8, 0)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-full h-full rounded-lg bg-gray-900 p-4 flex items-center justify-center">
                <QrCode className="w-full h-full text-white opacity-50" />
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{nft.eventName}</h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-gradient-to-r from-yellow-400 to-orange-500">
                {getRarityBadge(nft.rarity)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Date</span>
                </div>
                <p className="text-white">{new Date(nft.date).toLocaleDateString()}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Organizer</span>
                </div>
                <p className="text-white">{nft.organizer}</p>
              </div>

              <div className="col-span-2 space-y-1">
                <div className="flex items-center gap-2 text-gray-400">
                  <Hash className="w-4 h-4" />
                  <span className="text-sm">Token ID</span>
                </div>
                <p className="text-white font-mono text-sm truncate">{nft.hash}</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-2">
              <GlowingButton className="w-full sm:w-auto">
                View Certificate
              </GlowingButton>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

const AttendeeDashboard = () => {
  const { address, connect } = useWallet();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  
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

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % nftCollection.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + nftCollection.length) % nftCollection.length);
  };

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh] flex flex-col">
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Attendee Dashboard
      </motion.h1>

      {!address ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex items-center justify-center"
        >
          <GlassCard className="max-w-md mx-auto p-8">
            <div className="text-center space-y-6">
              <motion.div
                className="w-24 h-24 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ 
                  rotate: [0, 360],
                  transition: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center"
                  initial={{ rotate: 0 }}
                >
                  <Wallet className="w-12 h-12 text-white" />
                </motion.div>
              </motion.div>

              <h2 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h2>
              <p className="text-gray-400 mb-6">Connect your Algorand wallet to view your NFT collection</p>
              
              <GlowingButton
                onClick={connect}
                className="w-full"
              >
                Connect Algorand Wallet
              </GlowingButton>
            </div>
          </GlassCard>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
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
                <p className="text-gray-400">3 Events Attended</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* NFT Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="w-full"
              >
                <NFTCollectionCard nft={nftCollection[currentCardIndex]} />
              </motion.div>
            </AnimatePresence>

            {nftCollection.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none">
                <GlowingButton
                  onClick={prevCard}
                  className="!p-2 pointer-events-auto"
                  aria-label="Previous NFT"
                >
                  <ChevronLeft className="w-6 h-6" />
                </GlowingButton>
                <GlowingButton
                  onClick={nextCard}
                  className="!p-2 pointer-events-auto"
                  aria-label="Next NFT"
                >
                  <ChevronRight className="w-6 h-6" />
                </GlowingButton>
              </div>
            )}
          </div>
        </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AttendeeDashboard;