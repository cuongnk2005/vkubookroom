import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  MapPin, 
  Users, 
  ChevronLeft, 
  Clock, 
  Wifi, 
  Wind, 
  Monitor, 
  Zap, 
  CheckCircle2, 
  CalendarDays,
  ShieldCheck,
  Calendar
} from 'lucide-react-native';

import { mockRooms } from '../../data/mockRooms';
import { useBookingStore } from '../../store/useBookingStore';

const TIME_SLOTS = [
  '08:00 - 10:00',
  '10:00 - 12:00',
  '13:00 - 15:00',
  '15:00 - 17:00'
];

interface DateItem {
  fullDate: string;
  dayNumber: number;
  dayName: string;
  monthName: string;
}

const getUpcomingDates = (daysCount = 14): DateItem[] => {
  const dates: DateItem[] = [];
  const now = new Date();
  
  for (let i = 0; i < daysCount; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const fullDate = `${year}-${month}-${day}`;
    
    const dayName = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    
    dates.push({
      fullDate,
      dayNumber: d.getDate(),
      dayName,
      monthName,
    });
  }
  return dates;
};

export default function RoomDetailsScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const room = mockRooms.find(r => r.id === id);
  
  const upcomingDates = useMemo(() => getUpcomingDates(14), []);
  const [selectedDate, setSelectedDate] = useState<string>(upcomingDates[0].fullDate);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const addBooking = useBookingStore(state => state.addBooking);
  const isSlotBooked = useBookingStore(state => state.isSlotBooked);

  if (!room) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Room not found</Text>
        <Pressable style={styles.backLink} onPress={() => router.back()}>
          <Text style={styles.backLinkText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleBook = () => {
    if (!selectedSlot) return;
    
    const newBooking = {
      id: Math.random().toString(36).substring(2, 9),
      roomId: room.id,
      timeSlot: selectedSlot,
      date: selectedDate,
    };

    addBooking(newBooking);
    
    router.push({
      pathname: '/booking-confirmation',
      params: {
        roomName: room.name,
        date: selectedDate,
        timeSlot: selectedSlot,
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image Section */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: room.photoUrl }} style={styles.image} resizeMode="cover" />
          <LinearGradient 
            colors={['rgba(15, 23, 42, 0.65)', 'transparent', 'rgba(15, 23, 42, 0.4)']} 
            style={styles.imageOverlay} 
          />
          
          <SafeAreaView edges={['top']} style={styles.floatingHeader}>
            <Pressable style={styles.backBtn} onPress={() => router.back()} hitSlop={8}>
              <ChevronLeft size={24} color="#0F172A" />
            </Pressable>
          </SafeAreaView>
        </View>
        
        {/* Content Sheet */}
        <View style={styles.contentSheet}>
          <View style={styles.handleBar} />

          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{room.name}</Text>
              <View style={styles.locationRow}>
                <MapPin size={15} color="#4F46E5" />
                <Text style={styles.locationText}>{room.building}</Text>
              </View>
            </View>

            <View style={[styles.statusBadge, room.isAvailable ? styles.statusAvail : styles.statusOcc]}>
              <Text style={[styles.statusBadgeText, room.isAvailable ? styles.textAvail : styles.textOcc]}>
                {room.isAvailable ? 'Available' : 'Occupied'}
              </Text>
            </View>
          </View>

          {/* Quick Specs Chips */}
          <View style={styles.specsRow}>
            <View style={styles.specChip}>
              <Users size={16} color="#4F46E5" />
              <Text style={styles.specChipText}>{room.capacity} Maximum Seats</Text>
            </View>
            <View style={styles.specChip}>
              <ShieldCheck size={16} color="#16A34A" />
              <Text style={styles.specChipText}>Instant Booking</Text>
            </View>
          </View>

          {/* Amenities Grid */}
          <Text style={styles.sectionHeader}>Included Amenities</Text>
          <View style={styles.amenitiesGrid}>
            <View style={styles.amenityItem}>
              <Wifi size={18} color="#4F46E5" />
              <Text style={styles.amenityText}>Wi-Fi 6 High-speed</Text>
            </View>
            <View style={styles.amenityItem}>
              <Wind size={18} color="#0284C7" />
              <Text style={styles.amenityText}>Air Conditioning</Text>
            </View>
            <View style={styles.amenityItem}>
              <Monitor size={18} color="#7C3AED" />
              <Text style={styles.amenityText}>Smart Screen & HDMI</Text>
            </View>
            <View style={styles.amenityItem}>
              <Zap size={18} color="#D97706" />
              <Text style={styles.amenityText}>Power Outlets at Desk</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* 1. Date Selector Section */}
          <View style={styles.dateSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeader}>Select Reservation Date</Text>
              <View style={styles.dateBadge}>
                <CalendarDays size={13} color="#4F46E5" />
                <Text style={styles.dateBadgeText}>{selectedDate}</Text>
              </View>
            </View>
            <Text style={styles.sectionSub}>Choose your preferred study date:</Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.dateStrip}
            >
              {upcomingDates.map((item) => {
                const isSelected = selectedDate === item.fullDate;
                return (
                  <Pressable
                    key={item.fullDate}
                    style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                    onPress={() => {
                      setSelectedDate(item.fullDate);
                      setSelectedSlot(null); // Reset slot when switching date
                    }}
                  >
                    <Text style={[styles.dateDayName, isSelected && styles.dateTextSelected]}>
                      {item.dayName}
                    </Text>
                    <Text style={[styles.dateNumber, isSelected && styles.dateTextSelected]}>
                      {item.dayNumber}
                    </Text>
                    <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
                      {item.monthName}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.divider} />

          {/* 2. Time Slot Selection Section */}
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeader}>Select Available Time</Text>
            <View style={styles.slotCountBadge}>
              <Text style={styles.slotCountText}>
                {TIME_SLOTS.filter(s => !isSlotBooked(room.id, selectedDate, s)).length} open
              </Text>
            </View>
          </View>
          <Text style={styles.sectionSub}>Available slots for {selectedDate}:</Text>
          
          <View style={styles.slotGrid}>
            {TIME_SLOTS.map((slot) => {
              const booked = isSlotBooked(room.id, selectedDate, slot);
              const isSelected = selectedSlot === slot;
              
              return (
                <Pressable
                  key={slot}
                  style={[
                    styles.slotBtn,
                    isSelected && styles.slotSelected,
                    booked && styles.slotBooked
                  ]}
                  disabled={booked}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <View style={styles.slotBtnLeft}>
                    <Clock 
                      size={18} 
                      color={isSelected ? '#FFFFFF' : booked ? '#CBD5E1' : '#4F46E5'} 
                    />
                    <Text style={[
                      styles.slotText,
                      isSelected && styles.slotTextSelected,
                      booked && styles.slotTextBooked
                    ]}>
                      {slot}
                    </Text>
                  </View>

                  <View>
                    {booked ? (
                      <Text style={styles.bookedTag}>Reserved</Text>
                    ) : isSelected ? (
                      <CheckCircle2 size={18} color="#FFFFFF" />
                    ) : (
                      <Text style={styles.openTag}>Open</Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Booking Action */}
      <View style={[
        styles.bottomBar, 
        { paddingBottom: Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 8) + 12 }
      ]}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Reservation Fee</Text>
          <Text style={styles.priceVal}>Free for Students</Text>
        </View>
        
        <Pressable 
          style={[styles.bookBtn, !selectedSlot && styles.bookBtnDisabled]}
          disabled={!selectedSlot}
          onPress={handleBook}
        >
          <Text style={styles.bookBtnText}>
            {selectedSlot ? 'Reserve Space' : 'Select a Slot'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  scrollContent: {
    paddingBottom: 110,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 12,
  },
  backLink: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0F172A',
    borderRadius: 8,
  },
  backLinkText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerImageContainer: {
    height: 300,
    width: '100%',
    position: 'relative',
    backgroundColor: '#0F172A',
  },
  image: { 
    width: '100%', 
    height: '100%' 
  },
  imageOverlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  contentSheet: {
    marginTop: -28,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#0F172A', 
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusAvail: {
    backgroundColor: '#DCFCE7',
  },
  statusOcc: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  textAvail: {
    color: '#15803D',
  },
  textOcc: {
    color: '#B91C1C',
  },
  specsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 22,
  },
  specChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  specChipText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionHeader: { 
    fontSize: 17, 
    fontWeight: '800', 
    color: '#0F172A', 
  },
  sectionSub: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 12,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '48%',
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  amenityText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },
  divider: { 
    height: 1, 
    backgroundColor: '#F1F5F9', 
    marginVertical: 16,
  },
  dateSection: {
    marginBottom: 4,
  },
  dateStrip: {
    paddingVertical: 6,
    gap: 10,
  },
  dateCard: {
    width: 66,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateCardSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  dateDayName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  dateMonth: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dateBadgeText: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '700',
  },
  slotCountBadge: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  slotCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
  },
  slotGrid: { 
    gap: 10,
  },
  slotBtn: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16, 
    borderRadius: 16, 
    borderWidth: 1.5, 
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  slotBtnLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slotSelected: { 
    borderColor: '#4F46E5', 
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  slotBooked: { 
    backgroundColor: '#F8FAFC', 
    borderColor: '#F1F5F9',
  },
  slotText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#0F172A',
  },
  slotTextSelected: { 
    color: '#FFFFFF',
  },
  slotTextBooked: { 
    color: '#94A3B8', 
    textDecorationLine: 'line-through',
  },
  openTag: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bookedTag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  bottomBar: {
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22, 
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1, 
    borderTopColor: '#F1F5F9',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  priceVal: {
    fontSize: 15,
    fontWeight: '800',
    color: '#16A34A',
  },
  bookBtn: { 
    backgroundColor: '#4F46E5', 
    paddingHorizontal: 28, 
    paddingVertical: 14, 
    borderRadius: 100, 
    alignItems: 'center',
    shadowColor: '#4F46E5', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    elevation: 4,
  },
  bookBtnDisabled: { 
    backgroundColor: '#CBD5E1', 
    shadowOpacity: 0, 
    elevation: 0,
  },
  bookBtnText: { 
    color: '#FFFFFF', 
    fontSize: 15, 
    fontWeight: '700',
  },
});
