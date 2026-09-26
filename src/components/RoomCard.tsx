import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Users, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react-native';
import { Room } from '../data/mockRooms';

interface RoomCardProps {
  room: Room;
  width?: number;
  onPress?: () => void;
  index?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function RoomCard({ room, width, onPress, index = 0 }: RoomCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => { scale.value = withSpring(0.98, { damping: 15 }); };
  const handlePressOut = () => { scale.value = withSpring(1, { damping: 15 }); };

  return (
    <Animated.View 
      entering={FadeInDown.delay(Math.min(index * 60, 400)).springify().damping(14)}
      style={[styles.cardContainer, width ? { width } : {}]}
    >
      <AnimatedPressable 
        style={[styles.card, animatedStyle]} 
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: room.photoUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(15, 23, 42, 0.1)', 'rgba(15, 23, 42, 0.7)']}
            style={styles.gradient}
          />

          {/* Status Badge */}
          <View style={[styles.statusBadge, room.isAvailable ? styles.badgeAvailable : styles.badgeOccupied]}>
            {room.isAvailable ? (
              <CheckCircle2 size={13} color="#15803D" strokeWidth={2.5} />
            ) : (
              <AlertCircle size={13} color="#B91C1C" strokeWidth={2.5} />
            )}
            <Text style={[styles.badgeText, room.isAvailable ? styles.textAvailable : styles.textOccupied]}>
              {room.isAvailable ? 'Available' : 'Occupied'}
            </Text>
          </View>

          {/* Quick amenity tag on image */}
          <View style={styles.featuredBadge}>
            <Sparkles size={11} color="#FFFFFF" />
            <Text style={styles.featuredText}>Smart Room</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.roomName} numberOfLines={1}>{room.name}</Text>
          
          <View style={styles.tagsRow}>
            <View style={styles.tagPill}>
              <MapPin size={13} color="#4F46E5" />
              <Text style={styles.tagText}>{room.building}</Text>
            </View>

            <View style={styles.tagPill}>
              <Users size={13} color="#64748B" />
              <Text style={styles.tagText}>{room.capacity} Seats</Text>
            </View>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.amenitySummary}>⚡ High-speed Wi-Fi • AC • Projector</Text>
            <Text style={styles.freeBadge}>Free</Text>
          </View>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 14,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  imageContainer: {
    position: 'relative',
    height: 170,
    width: '100%',
    backgroundColor: '#E2E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  statusBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    gap: 5,
  },
  badgeAvailable: {
    backgroundColor: '#DCFCE7',
  },
  badgeOccupied: {
    backgroundColor: '#FEE2E2',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textAvailable: {
    color: '#15803D',
  },
  textOccupied: {
    color: '#B91C1C',
  },
  featuredBadge: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featuredText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  roomName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC',
  },
  amenitySummary: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    flex: 1,
  },
  freeBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
});
