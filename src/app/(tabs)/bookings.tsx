import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Calendar, MapPin, Clock, Trash2, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react-native';

import { useBookingStore } from '../../store/useBookingStore';
import { mockRooms } from '../../data/mockRooms';

export default function BookingsScreen() {
  const bookings = useBookingStore(state => state.bookings);
  const removeBooking = useBookingStore(state => state.removeBooking);
  const router = useRouter();

  const handleCancel = (bookingId: string, roomName: string) => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your reservation for ${roomName}?`,
      [
        { text: 'Keep Reservation', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: () => removeBooking(bookingId) 
        }
      ]
    );
  };

  const handleOpenRoomDetails = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Reservation History</Text>
          <Text style={styles.headerTitle}>My Bookings</Text>
        </View>
        {bookings.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{bookings.length} Active</Text>
          </View>
        )}
      </View>
      
      {bookings.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconBg}>
            <Calendar size={44} color="#6366F1" />
          </View>
          <Text style={styles.emptyTitle}>No Reservations Yet</Text>
          <Text style={styles.emptySubtitle}>
            You haven't reserved any study spaces yet. Find a quiet lab or discussion room to get started!
          </Text>
          <Pressable style={styles.browseBtn} onPress={() => router.push('/')}>
            <Text style={styles.browseBtnText}>Explore Available Rooms</Text>
            <ArrowRight size={18} color="#FFFFFF" style={{ marginLeft: 8 }} />
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const room = mockRooms.find(r => r.id === item.roomId);
            const roomName = room?.name || 'Study Room';

            return (
              <Pressable 
                style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
                onPress={() => handleOpenRoomDetails(item.roomId)}
              >
                <View style={styles.cardHeader}>
                  {room?.photoUrl ? (
                    <Image source={{ uri: room.photoUrl }} style={styles.thumbnail} />
                  ) : (
                    <View style={styles.thumbnailFallback}>
                      <Calendar size={20} color="#4F46E5" />
                    </View>
                  )}

                  <View style={styles.headerInfo}>
                    <View style={styles.statusRow}>
                      <View style={styles.confirmedPill}>
                        <CheckCircle2 size={12} color="#15803D" />
                        <Text style={styles.confirmedText}>Confirmed</Text>
                      </View>
                    </View>
                    <Text style={styles.roomName} numberOfLines={1}>{roomName}</Text>
                    <View style={styles.buildingRow}>
                      <MapPin size={13} color="#64748B" />
                      <Text style={styles.buildingText}>{room?.building || 'Main Campus'}</Text>
                    </View>
                  </View>

                  <Pressable 
                    style={styles.cancelBtn} 
                    onPress={(e) => {
                      e.stopPropagation?.();
                      handleCancel(item.id, roomName);
                    }}
                    hitSlop={8}
                  >
                    <Trash2 size={18} color="#EF4444" />
                  </Pressable>
                </View>

                <View style={styles.cardDivider} />

                {/* Date & Time Slot Details with Clickable Indicator */}
                <View style={styles.cardFooter}>
                  <View style={styles.footerLeft}>
                    <View style={styles.slotDetail}>
                      <Calendar size={13} color="#4F46E5" />
                      <Text style={styles.slotDetailText}>{item.date}</Text>
                    </View>
                    
                    <View style={styles.slotBadge}>
                      <Clock size={12} color="#4F46E5" />
                      <Text style={styles.slotBadgeText}>{item.timeSlot}</Text>
                    </View>
                  </View>

                  <View style={styles.viewRoomBtn}>
                    <Text style={styles.viewRoomText}>Details</Text>
                    <ChevronRight size={14} color="#4F46E5" />
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  countBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  list: { 
    padding: 20, 
    paddingTop: 8,
    paddingBottom: 40,
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  thumbnailFallback: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  statusRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  confirmedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  confirmedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#15803D',
  },
  roomName: { 
    fontSize: 17, 
    fontWeight: '800', 
    color: '#0F172A',
    marginBottom: 4,
  },
  buildingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buildingText: { 
    fontSize: 12, 
    color: '#64748B', 
    fontWeight: '500' 
  },
  cancelBtn: { 
    padding: 8, 
    backgroundColor: '#FEF2F2', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
    marginLeft: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 14,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  slotDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  slotDetailText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  slotBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 5,
    backgroundColor: '#EEF2FF', 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  slotBadgeText: { 
    fontSize: 12, 
    color: '#4F46E5', 
    fontWeight: '700' 
  },
  viewRoomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  viewRoomText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4F46E5',
  },
  emptyState: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 28 
  },
  emptyIconBg: {
    width: 88, 
    height: 88, 
    borderRadius: 44, 
    backgroundColor: '#EEF2FF',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  emptyTitle: { 
    fontSize: 20, 
    fontWeight: '800', 
    color: '#0F172A', 
    marginBottom: 8 
  },
  emptySubtitle: { 
    fontSize: 14, 
    color: '#64748B', 
    textAlign: 'center', 
    lineHeight: 22,
    marginBottom: 28 
  },
  browseBtn: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A', 
    paddingHorizontal: 24, 
    paddingVertical: 14, 
    borderRadius: 100,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  browseBtnText: { 
    color: '#FFFFFF', 
    fontWeight: '700', 
    fontSize: 15 
  },
});
